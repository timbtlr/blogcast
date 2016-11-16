from django.db import models

from django.utils.timezone import now


class Episode(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    source = models.CharField(max_length=500)
    image = models.CharField(max_length=500, blank=True, null=True)
    uploaded_time = models.DateTimeField(blank=True, null=True, default=now)