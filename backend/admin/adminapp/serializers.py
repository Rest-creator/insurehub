from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class AdminSignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['email'],  
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            is_admin=True,
        )
        return user
