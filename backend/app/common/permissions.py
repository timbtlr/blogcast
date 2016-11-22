from django.conf import settings
from rest_framework.permissions import BasePermission
from rest_framework.authentication import get_authorization_header


class ApiTokenPermissions(BasePermission):
    """
    Allows access if the request contains a valid API key.
    """
    def has_permission(self, request, view):
        key = request.META.get('HTTP_AUTHORIZATION', '')
        if key == settings.API_TOKEN:
            return True
        return False