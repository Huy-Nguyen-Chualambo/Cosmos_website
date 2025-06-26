from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Favorite
from .serializers import FavoriteSerializer
from celestialbodies.models import CelestialBody
from celestialbodies.serializers import CelestialBodySerializer
import jwt
from rest_framework.exceptions import AuthenticationFailed
from users.models import User

# Helper function to authenticate JWT token
def authenticate_jwt(request):
    token = request.COOKIES.get('jwt')
    
    if not token:
        raise AuthenticationFailed('Unauthenticated')
    
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'], options={"verify_iat": False})
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    
    user = User.objects.filter(id=payload['id']).first()
    
    if not user:
        raise AuthenticationFailed('User not found')
    
    return user, payload

class FavoriteListView(APIView):
    def get(self, request):
        user, _ = authenticate_jwt(request)
        favorites = Favorite.objects.filter(user=user)
        
        # Return details of the celestial bodies that are favorited
        celestial_bodies = [favorite.celestial_body for favorite in favorites]
        serializer = CelestialBodySerializer(celestial_bodies, many=True)
        
        return Response(serializer.data)

class FavoriteToggleView(APIView):
    def post(self, request):
        user, _ = authenticate_jwt(request)
        
        name = request.data.get('name')
        if not name:
            return Response({'error': 'Celestial body name is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            celestial_body = CelestialBody.objects.get(name__iexact=name)
        except CelestialBody.DoesNotExist:
            return Response({'error': 'Celestial body not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if already favorited
        favorite = Favorite.objects.filter(user=user, celestial_body=celestial_body).first()
        
        if favorite:
            # Already favorited, so remove from favorites
            favorite.delete()
            return Response({
                'message': 'Removed from favorites',
                'is_favorited': False
            })
        else:
            # Not favorited, so add to favorites
            favorite = Favorite(user=user, celestial_body=celestial_body)
            favorite.save()
            return Response({
                'message': 'Added to favorites',
                'is_favorited': True
            }, status=status.HTTP_201_CREATED)

class FavoriteCheckView(APIView):
    def get(self, request):
        user, _ = authenticate_jwt(request)
        
        name = request.query_params.get('name')
        if not name:
            return Response({'error': 'Celestial body name is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            celestial_body = CelestialBody.objects.get(name__iexact=name)
        except CelestialBody.DoesNotExist:
            return Response({'error': 'Celestial body not found'}, status=status.HTTP_404_NOT_FOUND)
        
        is_favorited = Favorite.objects.filter(user=user, celestial_body=celestial_body).exists()
        
        return Response({'is_favorited': is_favorited})