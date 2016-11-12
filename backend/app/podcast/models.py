from django.db import models


class Episode(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    source = models.CharField(max_length=500)
    image = models.CharField(max_length=500)
    uploaded_time = models.URLField(max_length=500)