from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from ..models import Admin
import re

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Admin
        fields = ['email', 'password', 'confirm_password']
    
    def validate(self, data):
        pw = data.get('password')
        cpw = data.get('confirm_password')
        if pw != cpw:
            raise serializers.ValidationError({
                'confirm_password': 'Passwords do not match.'
            })
        return data
    
    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError('Invalid email format.')
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters long.')
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter.')
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError('Password must contain at least one lowercase letter.')
        if not re.search(r'\d', value):
            raise serializers.ValidationError('Password must contain at least one digit.')
        if not re.search(r'[^A-Za-z\d]', value):
            raise serializers.ValidationError('Password must contain at least one special character.')
        return value

    def create(self, validated_data):
        return Admin.objects.create_user(**validated_data)
    