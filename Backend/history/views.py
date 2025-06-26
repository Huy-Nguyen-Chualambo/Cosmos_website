from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ViewHistory
from .serializers import ViewHistorySerializer
from celestialbodies.models import CelestialBody
import jwt
from rest_framework.exceptions import AuthenticationFailed
from users.models import User

# Helper function to authenticate JWT token (reused from favorite app)
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

class HistoryListView(APIView):
    def get(self, request):
        user, _ = authenticate_jwt(request)
        history_entries = ViewHistory.objects.filter(user=user)
        serializer = ViewHistorySerializer(history_entries, many=True)
        
        return Response(serializer.data)

class RecordViewView(APIView):
    def post(self, request):
        user, _ = authenticate_jwt(request)
        
        name = request.data.get('name')
        if not name:
            return Response({'error': 'Celestial body name is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            celestial_body = CelestialBody.objects.get(name__iexact=name)
        except CelestialBody.DoesNotExist:
            return Response({'error': 'Celestial body not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create a new history entry or update the timestamp if it already exists
        history_entry, created = ViewHistory.objects.get_or_create(
            user=user,
            celestial_body=celestial_body
        )
        
        # If entry already exists, update the viewed_at timestamp
        if not created:
            history_entry.save()  # This will update the auto_now_add field
        
        return Response({
            'message': 'View recorded successfully',
            'created': created
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)