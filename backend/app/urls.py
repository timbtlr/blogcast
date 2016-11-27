from rest_framework.routers import DefaultRouter
from app.podcast.views import EpisodeViewSet
from app.blog.views import BlogViewSet

router = DefaultRouter()
router.register(prefix='episodes', viewset=EpisodeViewSet)
router.register(prefix='blogs', viewset=BlogViewSet)
urlpatterns = router.urls