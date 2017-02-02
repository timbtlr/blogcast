# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_blog_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='is_draft',
            field=models.BooleanField(default=False),
        ),
    ]
