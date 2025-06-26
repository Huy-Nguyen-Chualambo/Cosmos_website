from rest_framework import serializers
from .models import CelestialBody

class CelestialBodySerializer(serializers.ModelSerializer):
    class Meta:
        model = CelestialBody
        exclude = ['id', 'created_at', 'updated_at']
        
class CelestialBodyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CelestialBody
        fields = ['name']