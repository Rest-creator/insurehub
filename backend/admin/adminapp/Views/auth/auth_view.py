from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ...serializers import AdminSignupSerializer
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
class LoginAPIView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(request, username = email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
