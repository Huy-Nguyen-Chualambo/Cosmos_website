from django.db import models
from users.models import User
from celestialbodies.models import CelestialBody

# Create your models here.
class ViewHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="view_history")
    celestial_body = models.ForeignKey(CelestialBody, on_delete=models.CASCADE, related_name="viewed_by")
    viewed_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'celestial_body']
        ordering = ['-viewed_at']
        verbose_name = 'View History'
        verbose_name_plural = 'View Histories'