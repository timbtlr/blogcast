from rest_framework import serializers
from app.blog.models import Blog, BlogImage
from slugify import slugify


class BlogSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Blog model """
    uploaded_time = serializers.DateTimeField(read_only=True)
    id = serializers.CharField(read_only=True)

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        data['id'] = slugify(data['title'])
        return data

    class Meta:
        model = Blog
        fields = ("id", "title", "description", "image", "author", "text", "uploaded_time", "category", "is_draft")


class BlogImageSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Blog Image model """
    uploaded_time = serializers.DateTimeField(read_only=True)

    class Meta:
        model = BlogImage
        fields = ("id", "file_name", "source", "uploaded_time")