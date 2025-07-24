from django.urls import path
from app_views.company_auth import CompanySignupView, CompanyLoginView, CompanyProfileView, CompanyPasswordResetRequestView, CompanyPasswordResetConfirmView
from app_views.user_auth import UserSignupView, UserLoginView, UserProfileView, UserPasswordResetRequestView, UserPasswordResetConfirmView
from app_views.admin_auth import AdminSignupView, AdminLoginView, AdminProfileView, AdminPasswordResetRequestView, AdminPasswordResetConfirmView

from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenBlacklistView
)

urlpatterns = [
    # SimpleJWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    # Company
    path('company/signup/', CompanySignupView.as_view(), name='company-signup'),
    path('company/login/', CompanyLoginView.as_view(), name='company-login'),
    path('company/profile/', CompanyProfileView.as_view(), name='company-profile'),
    path('company/password-reset/', CompanyPasswordResetRequestView.as_view(), name='company-password-reset'),
    path('company/password-reset/confirm/', CompanyPasswordResetConfirmView.as_view(), name='company-password-reset-confirm'),
    # User
    path('user/signup/', UserSignupView.as_view(), name='user-signup'),
    path('user/login/', UserLoginView.as_view(), name='user-login'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/password-reset/', UserPasswordResetRequestView.as_view(), name='user-password-reset'),
    path('user/password-reset/confirm/', UserPasswordResetConfirmView.as_view(), name='user-password-reset-confirm'),
    # Admin
    path('admin/signup/', AdminSignupView.as_view(), name='admin-signup'),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/profile/', AdminProfileView.as_view(), name='admin-profile'),
    path('admin/password-reset/', AdminPasswordResetRequestView.as_view(), name='admin-password-reset'),
    path('admin/password-reset/confirm/', AdminPasswordResetConfirmView.as_view(), name='admin-password-reset-confirm'),
]