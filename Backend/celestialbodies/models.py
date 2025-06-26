from django.db import models

# Create your models here.
class CelestialBody(models.Model):
    
    name = models.CharField(max_length=255, unique=True, db_index=True)
    description = models.TextField(null=True, blank=True)
    distance_light_years = models.DecimalField(max_digits=20, decimal_places=6, null=True, blank=True)
    mass_solar = models.DecimalField(max_digits=20, decimal_places=10, null=True, blank=True)
    image_url = models.URLField(max_length=512, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
        verbose_name = 'Celestial Body'
        verbose_name_plural = 'Celestial Bodies'
