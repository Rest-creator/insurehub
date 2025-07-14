from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import CompanyProfile

User = get_user_model()

class CompanySignupSerializer(serializers.Serializer):
    # —————————————————————————————
    # 1. USER (Auth) fields
    # —————————————————————————————
    companyEmail     = serializers.EmailField(write_only=True)
    password         = serializers.CharField(write_only=True, min_length=8)
    confirmPassword  = serializers.CharField(write_only=True, min_length=8)

    # —————————————————————————————
    # 2. COMPANY PROFILE fields (flat)
    # —————————————————————————————
    companyName              = serializers.CharField(write_only=True, max_length=255)
    contactPerson            = serializers.CharField(write_only=True, max_length=255)
    phoneNumber              = serializers.CharField(write_only=True, max_length=20)
    website                  = serializers.URLField(write_only=True, required=False, allow_blank=True)
    companyType              = serializers.ChoiceField(
        choices=CompanyProfile.COMPANY_TYPE_CHOICES,
        write_only=True
    )
    registrationNumber       = serializers.CharField(write_only=True, max_length=100)
    yearFounded              = serializers.IntegerField(write_only=True)
    taxId                    = serializers.CharField(write_only=True, max_length=100)
    insuranceLicenseNumber   = serializers.CharField(write_only=True, max_length=100)
    regulatoryBody           = serializers.CharField(write_only=True, max_length=255)
    numberOfEmployees        = serializers.ChoiceField(
        choices=CompanyProfile.EMPLOYEES_RANGE_CHOICES,
        write_only=True
    )
    country                  = serializers.CharField(write_only=True, max_length=100)
    address                  = serializers.CharField(write_only=True)
    description              = serializers.CharField(write_only=True)

    # —————————————————————————————
    # 3. OPTIONAL / IGNORE (if you don't persist them in the model)
    # —————————————————————————————
    agreed_tnc = serializers.BooleanField(write_only=True, required=False)
    status     = serializers.CharField(write_only=True, required=False)

    # ----------------------------------------------------------------
    # Validator: ensure password == confirmPassword
    # ----------------------------------------------------------------
    def validate(self, data):
        pw  = data.get("password")
        cpw = data.get("confirmPassword")
        if pw != cpw:
            raise serializers.ValidationError({
                "confirmPassword": "Passwords do not match."
            })
        return data

    # ----------------------------------------------------------------
    # create(): build User, then CompanyProfile
    # ----------------------------------------------------------------
    def create(self, validated_data):
        # 1. Pop out the user‐related bits
        email    = validated_data.pop("companyEmail")
        password = validated_data.pop("password")
        # We can safely discard confirmPassword (we only needed it for validation)
        validated_data.pop("confirmPassword", None)

        # 2. Create the User with user_type='company' and approval_status='pending'
        user = User.objects.create_user(
            email=email,
            password=password,
            user_type='company',
            approval_status='pending'
        )

        # 3. Now pop out all the company-profile fields and rename them
        company_profile_data = {
            "company_name": validated_data.pop("companyName"),
            "contact_person": validated_data.pop("contactPerson"),
            "contact_phonenumber": validated_data.pop("phoneNumber"),
            "company_website": validated_data.pop("website", ""),
            "company_type": validated_data.pop("companyType"),
            "company_registration_number": validated_data.pop("registrationNumber"),
            "year_founded": validated_data.pop("yearFounded"),
            "tax_identification_number": validated_data.pop("taxId"),
            "insurance_license_number": validated_data.pop("insuranceLicenseNumber"),
            "regulatory_body": validated_data.pop("regulatoryBody"),
            "employees_range": validated_data.pop("numberOfEmployees"),
            "country": validated_data.pop("country"),
            "company_address": validated_data.pop("address"),
            "company_description": validated_data.pop("description"),
        }

        # 4. (Optional) If you want to persist agreed_tnc or status in CompanyProfile,
        #    you would do something like:
        #
        # company_profile_data["agreed_tnc"] = validated_data.pop("agreed_tnc", None)
        # company_profile_data["status"] = validated_data.pop("status", None)
        #
        #    But since your current CompanyProfile model does NOT have those fields,
        #    we simply ignore them. If you do add them, include them above.

        # 5. Finally, create the CompanyProfile linked to `user`
        CompanyProfile.objects.create(user=user, **company_profile_data)

        return user

    class Meta:
        # We’re using a “Serializer” (not ModelSerializer) because we’re flattening
        # the incoming JSON. You don’t need a Meta.model here.
        fields = [
            "companyEmail", "password", "confirmPassword",
            "companyName", "contactPerson", "phoneNumber", "website",
            "companyType", "registrationNumber", "yearFounded",
            "taxId", "insuranceLicenseNumber", "regulatoryBody",
            "numberOfEmployees", "country", "address", "description",
            "agreed_tnc", "status"
        ]



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
