from django.urls import path
from .app_views.auth import CompanySignupView, LoginView

urlpatterns = [
    path('company/signup/', CompanySignupView.as_view(), name='company-signup'),
    path('company/login/', LoginView.as_view(), name='company-login'),
]