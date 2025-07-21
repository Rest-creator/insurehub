from ipaddress import ip_address
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..appserializer.user_serializer import UserSignupSerializer
from django.core.cache import cache
from django.conf import settings
from django.contrib.auth import authenticate
from django.core.cache import cache
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import time


class AdminLoginView(APIView):
    def post(self, request):
        # Get email and password from request
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()

        # Validate email and password
        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Brute force protection
        cache_key = f"login_attempts_{email}"
        login_attempts = cache.get(cache_key, 0)
        
        if login_attempts >= 5:
            return Response({"error": "Too many login attempts. Please try again later."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        
        # Authenticate user
        user = authenticate(request, email=email, password=password)

        if user is None:
            # Increment failed attempts
            cache.set(cache_key, attempts +1, timeout=settings.LOGIN_ATTEMPTS_TIMEOUT)
            remaining_attempts= settings.MAX_LOGIN_ATTEMPTS - (attempts +1)

            return Response({"error":"Invalid credentials", "remaining_attempts": remaining_attempts}, status=status.HTTP_401_UNAUTHORIZED)

        # Reset attempts on successful login
        cache.delete(cache_key)

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'email': user.email,
                'is_staff': user.is_staff
            }
        }, status=status.HTTP_200_OK)

