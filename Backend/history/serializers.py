from rest_framework import serializers
from .models import ViewHistory
from celestialbodies.serializers import CelestialBodySerializer

class ViewHistorySerializer(serializers.ModelSerializer):
    celestial_body = CelestialBodySerializer(read_only=True)
    
    class Meta:
        model = ViewHistory
        fields = ['id', 'celestial_body', 'viewed_at']