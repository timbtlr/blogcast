from rest_framework import viewsets
from app.podcast.models import Episode
from app.podcast.serializers import EpisodeSerializer


class EpisodeViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Episode objects """
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer