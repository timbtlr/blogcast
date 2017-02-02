from rest_framework import viewsets
from rest_framework import filters

from app.common.permissions import ApiTokenPermissions
from app.blog.models import Blog, BlogImage
from app.blog.serializers import BlogSerializer, BlogImageSerializer


class BlogViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Blog objects """
    queryset = Blog.objects.all().order_by("-uploaded_time")
    serializer_class = BlogSerializer
    permission_classes = (ApiTokenPermissions, )
    filter_backends = (filters.SearchFilter, )
    search_fields = ('category', )


class BlogImageViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Blog objects """
    queryset = BlogImage.objects.all().order_by("-uploaded_time")
    serializer_class = BlogImageSerializer
    permission_classes = (ApiTokenPermissions, )