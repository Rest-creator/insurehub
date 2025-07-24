
from django.urls import path, include
from .views import *
from .CSRF import GetCSRFToken
from .Views.auth.auth_view import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [   
   path('admin/signup/', AdminSignupView.as_view(), name='admin-signup'),
   path('login/', LoginAPIView.as_view(), name='api-login'),
   
   #token urls
   path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
   path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]