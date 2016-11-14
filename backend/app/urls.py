from rest_framework.routers import DefaultRouter
from app.podcast.views import EpisodeViewSet

router = DefaultRouter()
router.register(prefix='episodes', viewset=EpisodeViewSet)
urlpatterns = router.urls