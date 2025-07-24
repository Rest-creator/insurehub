from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class UserManager(BaseUserManager):
    """Custom user model manager where email is the unique identifier"""
    def create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password"""
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # This handles password hashing
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    """Custom user model that uses email as the primary identifier and supports admin, company, and individual roles."""
    username = None
    email = models.EmailField(_('email address'), unique=True)
    
    # Add these to resolve the reverse accessor conflicts
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name="custom_user_groups",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="custom_user_permissions",
        related_query_name="user",
    )
    
    USER_TYPE_CHOICES = (
        ('individual', 'Individual'),
        ('company', 'Insurance Company'),
        ('admin', 'Administrator'),
    )
    
    user_type = models.CharField(
        max_length=20, 
        choices=USER_TYPE_CHOICES,
        default='individual'
    )
    is_verified = models.BooleanField(default=False)
    
    # Status for company users
    APPROVAL_STATUS = (
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    approval_status = models.CharField(
        max_length=20,
        choices=APPROVAL_STATUS,
        default='pending'
    )
    
    # Common fields for all users
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)

    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = 'email'

    objects = UserManager()
    
    def __str__(self):
        return self.email

class CompanyProfile(models.Model):
    """Extended profile for insurance companies, mapped from frontend signup fields."""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='company_profile',
        limit_choices_to={'user_type': 'company'}
    )
    
    COMPANY_TYPE_CHOICES = (
        ('insurance_provider', 'Insurance Provider'),
        ('broker', 'Broker'),
        ('reinsurance', 'Reinsurance Company'),
        ('mga', 'MGA (Managing General Agent)'),
        ('other', 'Other'),
    )
    
    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    contact_phonenumber = models.CharField(max_length=20)
    company_website = models.URLField(max_length=255, blank=True, null=True)
    company_type = models.CharField(
        max_length=20,
        choices=COMPANY_TYPE_CHOICES
    )
    company_registration_number = models.CharField(max_length=100)
    year_founded = models.CharField(max_length=10)
    tax_identification_number = models.CharField(max_length=100)
    insurance_license_number = models.CharField(max_length=100)
    regulatory_body = models.CharField(max_length=255)
    
    EMPLOYEES_RANGE_CHOICES = (
        ('1-10', '1-10'),
        ('11-50', '11-50'),
        ('51-200', '51-200'),
        ('201-500', '201-500'),
        ('501-1000', '501-1000'),
        ('1000+', '1000+'),
    )
    employees_range = models.CharField(
        max_length=10,
        choices=EMPLOYEES_RANGE_CHOICES
    )
    country = models.CharField(max_length=100)
    company_address = models.TextField()
    company_description = models.TextField(blank=True, null=True)
    company_code = models.CharField(max_length=100, blank=True, null=True)
    
    # Additional fields for tracking
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.company_name} ({self.user.email})"

    class Meta:
        verbose_name = "Company Profile"
        verbose_name_plural = "Company Profiles"

class AdminProfile(models.Model):
    """Extended profile for administrators."""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='admin_profile',
        limit_choices_to={'user_type': 'admin'}
    )
    
    # Additional fields for administrators
    admin_title = models.CharField(max_length=100)
    admin_department = models.CharField(max_length=100)
    
    # Additional fields for tracking
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email} (Admin)"