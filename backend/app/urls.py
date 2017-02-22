from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

from app.podcast.views import EpisodeViewSet
from app.blog.views import BlogViewSet, BlogImageViewSet

router = DefaultRouter()
router.register(prefix='episodes', viewset=EpisodeViewSet)
router.register(prefix='blogs', viewset=BlogViewSet)
router.register(prefix='blog-images', viewset=BlogImageViewSet)

urlpatterns = [
	url(r'^login/', obtain_jwt_token),
	url(r'^verify/', verify_jwt_token)
]
urlpatterns += router.urls