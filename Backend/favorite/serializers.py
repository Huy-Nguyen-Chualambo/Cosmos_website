from rest_framework import serializers
from .models import Favorite
from celestialbodies.serializers import CelestialBodySerializer

class FavoriteSerializer(serializers.ModelSerializer):
    celestial_body = CelestialBodySerializer(read_only=True)
    
    class Meta:
        model = Favorite
        fields = ['id', 'celestial_body', 'favorited_at']