from rest_framework.routers import DefaultRouter
from app.podcast.views import EpisodeViewSet
from app.blog.views import BlogViewSet, BlogImageViewSet

router = DefaultRouter()
router.register(prefix='episodes', viewset=EpisodeViewSet)
router.register(prefix='blogs', viewset=BlogViewSet)
router.register(prefix='blog-images', viewset=BlogImageViewSet)
urlpatterns = router.urls