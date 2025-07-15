from rest_framework import generics
from .models import *
from .serializers.auth_serializer import *

#company signup view
class RegisterCompanyAPIView(generics.CreateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = RegisterCompanySerializer
