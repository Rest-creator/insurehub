from ..models import CompanyProfile
from ..serializers.auth_serializer import CompanySignupSerializer
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from ..serializers.auth_serializer import LoginSerializer, UserSerializer, CompanyProfileSerializer
from ..models import CompanyProfile


class CompanySignupView(APIView):
    permission_classes = []  # or whatever permissions you need

    def post(self, request, *args, **kwargs):
        serializer = CompanySignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"detail": "Company account created. Awaiting approval."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        company_code = serializer.validated_data.get('company_code', None)

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if user.user_type != 'company':
            return Response({"error": "This account is not a company account"}, status=status.HTTP_403_FORBIDDEN)

        if user.approval_status != 'approved':
            return Response({"error": "Company account not yet approved"}, status=status.HTTP_403_FORBIDDEN)

        # Validate company code if provided
        if company_code:
            try:
                profile = user.company_profile
                if profile.company_registration_number != company_code:
                    return Response({"error": "Invalid company code"}, status=status.HTTP_401_UNAUTHORIZED)
            except CompanyProfile.DoesNotExist:
                return Response({"error": "Company profile not found"}, status=status.HTTP_404_NOT_FOUND)

        # Create or get token
        token, created = Token.objects.get_or_create(user=user)

        login(request, user)  # Optional: creates session login (usually not needed for token auth)

        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
            "company_profile": CompanyProfileSerializer(user.company_profile).data
        })