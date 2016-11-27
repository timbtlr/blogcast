from rest_framework import viewsets

from app.common.permissions import ApiTokenPermissions
from app.blog.models import Blog
from app.blog.serializers import BlogSerializer


class BlogViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Blog objects """
    queryset = Blog.objects.all().order_by("-uploaded_time")
    serializer_class = BlogSerializer
    permission_classes = (ApiTokenPermissions, )