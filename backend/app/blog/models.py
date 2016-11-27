from django.db import models

from django.utils.timezone import now


class Blog(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    author = models.CharField(max_length=100)
    image = models.CharField(max_length=500, blank=True, null=True)
    text = models.TextField()
    uploaded_time = models.DateTimeField(blank=True, null=True, default=now)