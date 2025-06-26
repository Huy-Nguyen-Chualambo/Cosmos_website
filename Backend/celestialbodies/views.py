from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CelestialBody
from .serializers import CelestialBodySerializer, CelestialBodyNameSerializer

# Create your views here.
class CelestialBodyAutocompleteView(APIView):
    def get(self, request):
        name = request.query_params.get('name', '')
        bodies = CelestialBody.objects.filter(name__istartswith=name)
        serializer = CelestialBodyNameSerializer(bodies, many=True)
        
        return Response(serializer.data)

class CelestialBodySearchView(APIView):
    def get(self, request):
        name = request.query_params.get('name')
        
        if not name:
            return Response({'error': 'Missing name parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            body = CelestialBody.objects.get(name__iexact=name)
        except CelestialBody.DoesNotExist:
            return Response({'error': 'Celestial body not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CelestialBodySerializer(body)
        
        return Response(serializer.data)