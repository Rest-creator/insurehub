from django.urls import path
from .views import *

urlpatterns = [
    path('auth/company/registration', RegisterCompanyAPIView.as_view(), name='register_company'),
]
