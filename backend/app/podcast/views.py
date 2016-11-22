from rest_framework import viewsets

from app.common.permissions import ApiTokenPermissions
from app.podcast.models import Episode
from app.podcast.serializers import EpisodeSerializer


class EpisodeViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Episode objects """
    queryset = Episode.objects.all().order_by("-uploaded_time")
    serializer_class = EpisodeSerializer
    permission_classes = (ApiTokenPermissions, )