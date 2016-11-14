from rest_framework import serializers
from app.podcast.models import Episode


class EpisodeSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Episode model """
    class Meta:
        model = Episode
        fields = ("title", "description", "source", "image", "uploaded_time")