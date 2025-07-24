
from django.urls import path, include
from .views import *
from .CSRF import GetCSRFToken
from .Views.auth.auth_view import *

urlpatterns = [   
   path('admin/signup/', AdminSignupView.as_view(), name='admin-signup'),
   path('login/', LoginAPIView.as_view(), name='api-login'),
   path('csrf/', GetCSRFToken.as_view(), name='get-csrf'),
]