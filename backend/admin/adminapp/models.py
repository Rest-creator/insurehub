
from django.contrib.auth.models import AbstractUser
from django.db import models

#Extends the base user model
class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, unique=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.email
