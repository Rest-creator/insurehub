# Views for company authentication

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import CompanySignupSerializer, LoginSerializer, UserSerializer

class CompanySignupView(generics.CreateAPIView):
    serializer_class = CompanySignupSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company_profile = serializer.save()
        user_data = UserSerializer(company_profile.user).data
        return Response({
            'user': user_data,
            'company_profile_id': company_profile.id,
            'message': 'Company registered successfully. Awaiting approval.'
        }, status=status.HTTP_201_CREATED)

from ..serializers import AuthLoginSerializer

class CompanyLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AuthLoginSerializer(data={**request.data, 'user_type': 'company'})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data
        return Response({
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }, status=status.HTTP_200_OK)

from ..serializers import CompanyProfileSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework.permissions import IsAuthenticated

class CompanyProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            profile = request.user.companyprofile
        except CompanyProfile.DoesNotExist:
            return Response({'error': 'Company profile not found.'}, status=404)
        serializer = CompanyProfileSerializer(profile)
        return Response(serializer.data)

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse

class CompanyPasswordResetRequestView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email, user_type='company')
        except User.DoesNotExist:
            return Response({'message': 'Password reset email sent.'})
        token = default_token_generator.make_token(user)
        reset_url = request.build_absolute_uri(
            reverse('company-password-reset-confirm') + f'?token={token}&uid={user.pk}'
        )
        send_mail(
            subject='Company Password Reset Request',
            message=f'Click the link to reset your password: {reset_url}',
            from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@insurehub.com'),
            recipient_list=[user.email],
        )
        return Response({'message': 'Password reset email sent.'})

class CompanyPasswordResetConfirmView(APIView):
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
            user = User.objects.get(pk=uid, user_type='company')
        except User.DoesNotExist:
            return Response({'error': 'Invalid user.'}, status=400)
        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token.'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password has been reset.'})
