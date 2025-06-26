from django.db import models
from django.contrib.auth.models import AbstractUser
import random

# Create your models here.
class User(AbstractUser):
    id = models.CharField(primary_key=True, max_length=4, editable=False, unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def save(self, *args, **kwargs):
        if not self.id:
            # Đảm bảo id là duy nhất
            while True:
                random_id = generate_random_id()
                if not User.objects.filter(id=random_id).exists():
                    self.id = random_id
                    break
        super().save(*args, **kwargs)
    
def generate_random_id():
    return '{:04d}'.format(random.randint(0, 9999))