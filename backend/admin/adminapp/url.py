from django.urls import path
from .appviews.user_views import AdminLoginView

urlpatterns = [
    path('admin/login/', AdminLoginView.as_view(), name='admin_login'),
]