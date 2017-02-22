from rest_framework import viewsets
from rest_condition import And, Or, Not

from app.common.permissions import ApiTokenPermissions, IsAuthenticated, IsListOrRetrieve
from app.podcast.models import Episode
from app.podcast.serializers import EpisodeSerializer


class EpisodeViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Episode objects """
    queryset = Episode.objects.all().order_by("-uploaded_time")
    serializer_class = EpisodeSerializer
    permission_classes = (
        Or(
            And(
                ApiTokenPermissions,
                IsListOrRetrieve
            ),
            IsAuthenticated
        ), 
    )