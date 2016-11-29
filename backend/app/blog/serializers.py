from rest_framework import serializers
from app.blog.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Blog model """
    uploaded_time = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Blog
        fields = ("id", "title", "description", "image", "author", "text", "uploaded_time")