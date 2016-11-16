# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('podcast', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='episode',
            name='uploaded_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
