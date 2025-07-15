from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import CompanyProfile
from django.contrib.auth.hashers import make_password

User = get_user_model()

#Company registration serializer
class RegisterCompanySerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CompanyProfile
        fields = '__all__'  

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)



# 1. LOGIN SERIALIZER
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    # This will be checked against CompanyProfile.company_registration_number
    company_code = serializers.CharField(required=False, write_only=True)

    def validate(self, data):
        # You could add extra validation here if needed
        return data

# 2. USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'user_type',
            'is_verified',
            'approval_status',
        )
        read_only_fields = fields


# 3. COMPANY PROFILE SERIALIZER
class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        # “exclude = ( 'user', )” would work as well, but here we spell out fields explicitly:
        fields = (
            'company_name',
            'contact_person',
            'contact_phonenumber',
            'company_website',
            'company_type',
            'company_registration_number',
            'year_founded',
            'tax_identification_number',
            'insurance_license_number',
            'regulatory_body',
            'employees_range',
            'country',
            'company_address',
            'company_description',
            'date_created',
            'date_modified',
        )
        read_only_fields = (
            'date_created',
            'date_modified',
        )
