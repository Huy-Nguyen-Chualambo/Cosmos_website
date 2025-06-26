from django.db import models
from users.models import User
from celestialbodies.models import CelestialBody

# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    celestial_body = models.ForeignKey(CelestialBody, on_delete=models.CASCADE, related_name="favorited_by")
    favorited_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'celestial_body')
        ordering = ['-favorited_at']
        verbose_name = 'Favorite'
        verbose_name_plural = 'Favorites'
