   # myapp/middleware.py
from django.core.cache import cache
from django.conf import settings
from django.http import HttpResponseForbidden

class BruteForceProtectionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        
        response = self.get_response(request)

           
        if request.path == settings.LOGIN_URL and request.method == "POST":
            ip_address = request.META.get("REMOTE_ADDR")
            cache_key = f"login_attempts:{ip_address}"
            login_attempts = cache.get(cache_key, 0)

               
            if response.status_code != 200:
                login_attempts += 1
                cache.set(cache_key, login_attempts, timeout=settings.BRUTE_FORCE_TIMEOUT)

               
            if login_attempts >= settings.BRUTE_FORCE_THRESHOLD:
                return HttpResponseForbidden(
                    f"Too many login attempts. Please try again later after {settings.BRUTE_FORCE_TIMEOUT // 60} minutes."
                )

        return response
   