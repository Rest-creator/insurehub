from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, CompanyProfile, AdminProfile
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.cache import cache
from django.conf import settings
from django.utils import timezone

User = User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'user_type')

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    def validate(self, attrs):
        from django.core.cache import cache
        from django.conf import settings
        request = self.context.get('request')
        email = attrs.get('email')
        ip = request.META.get('REMOTE_ADDR') if request else None
        cache_key = f"signup_attempts_{email or ip}"
        attempts = cache.get(cache_key, 0)
        max_attempts = getattr(settings, 'SIGNUP_MAX_ATTEMPTS', 5)
        block_timeout = getattr(settings, 'SIGNUP_ATTEMPTS_TIMEOUT', 900)
        if attempts >= max_attempts:
            raise serializers.ValidationError('Too many signup attempts. Please try again later.')
        try:
            validate_password(attrs['password'])
        except Exception as e:
            cache.set(cache_key, attempts + 1, timeout=block_timeout)
            raise
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            user_type='individual'
        )
        # Reset signup attempts on success
        from django.core.cache import cache
        email = validated_data['email']
        cache_key = f"signup_attempts_{email}"
        cache.delete(cache_key)
        return user

class AdminSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name')

    def validate(self, attrs):
        from django.core.cache import cache
        from django.conf import settings
        request = self.context.get('request')
        email = attrs.get('email')
        ip = request.META.get('REMOTE_ADDR') if request else None
        cache_key = f"signup_attempts_{email or ip}"
        attempts = cache.get(cache_key, 0)
        max_attempts = getattr(settings, 'SIGNUP_MAX_ATTEMPTS', 5)
        block_timeout = getattr(settings, 'SIGNUP_ATTEMPTS_TIMEOUT', 900)
        if attempts >= max_attempts:
            raise serializers.ValidationError('Too many signup attempts. Please try again later.')
        try:
            validate_password(attrs['password'])
        except Exception as e:
            cache.set(cache_key, attempts + 1, timeout=block_timeout)
            raise
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            user_type='admin'
        )
        AdminProfile.objects.create(user=user)
        # Reset signup attempts on success
        from django.core.cache import cache
        email = validated_data['email']
        cache_key = f"signup_attempts_{email}"
        cache.delete(cache_key)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'user_type']

class CompanyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = CompanyProfile
        fields = '__all__'

class CompanySignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    class Meta:
        model = CompanyProfile
        fields = [
            'email', 'password', 'first_name', 'last_name',
            'company_name', 'contact_person', 'contact_phonenumber',
            'company_website', 'company_type', 'company_registration_number',
            'year_founded', 'tax_identification_number', 'insurance_license_number',
            'regulatory_body', 'employees_range', 'country', 'company_address',
            'company_description', 'company_code'
        ]

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            user_type='company',
            is_verified=False,
            approval_status='pending',
        )
        profile = CompanyProfile.objects.create(user=user, **validated_data)
        return profile

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        if not user.is_active:
            raise serializers.ValidationError('User is inactive')
        return {'user': user}
