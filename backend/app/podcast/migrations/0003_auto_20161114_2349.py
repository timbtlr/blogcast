# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('podcast', '0002_auto_20161114_2348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='episode',
            name='uploaded_time',
            field=models.DateTimeField(null=True, default=django.utils.timezone.now, blank=True),
        ),
    ]
