# Views for admin authentication

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class AdminSignupView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(user_type='admin')
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Admin registered successfully.'
        }, status=status.HTTP_201_CREATED)

from ..serializers import AuthLoginSerializer

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AuthLoginSerializer(data={**request.data, 'user_type': 'admin'})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }, status=status.HTTP_200_OK)

from ..serializers import AdminProfileSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework.permissions import IsAuthenticated

class AdminProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            profile = request.user.adminprofile
        except Exception:
            return Response({'error': 'Admin profile not found.'}, status=404)
        serializer = AdminProfileSerializer(profile)
        return Response(serializer.data)

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse

class AdminPasswordResetRequestView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email, user_type='admin')
        except User.DoesNotExist:
            return Response({'message': 'Password reset email sent.'})
        token = default_token_generator.make_token(user)
        reset_url = request.build_absolute_uri(
            reverse('admin-password-reset-confirm') + f'?token={token}&uid={user.pk}'
        )
        send_mail(
            subject='Admin Password Reset Request',
            message=f'Click the link to reset your password: {reset_url}',
            from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@insurehub.com'),
            recipient_list=[user.email],
        )
        return Response({'message': 'Password reset email sent.'})

class AdminPasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']
        uid = request.query_params.get('uid') or request.data.get('uid')
        if not uid:
            return Response({'error': 'Invalid request.'}, status=400)
        try:
            user = User.objects.get(pk=uid, user_type='admin')
        except User.DoesNotExist:
            return Response({'error': 'Invalid user.'}, status=400)
        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token.'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password has been reset.'})
