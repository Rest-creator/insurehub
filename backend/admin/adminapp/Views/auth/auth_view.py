from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ...serializers import AdminSignupSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.views import View
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from ...models import CustomUser as User

# View to handle admin signup
class AdminSignupView(APIView):
    def post(self, request):
        print("Received data:", request.data) #debugging line
        serializer = AdminSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Admin account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
#authenticate the user using email(username) and password
class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        print("Received data:", request.data)  # debugging line

        if not username or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'message': 'Login successful',
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
