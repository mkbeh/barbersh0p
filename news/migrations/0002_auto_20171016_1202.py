# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-10-16 09:02
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='new',
            name='posted',
            field=models.DateTimeField(db_index=True, default=datetime.datetime(2017, 10, 16, 12, 2, 7, 467285), verbose_name='Опубликована'),
        ),
    ]