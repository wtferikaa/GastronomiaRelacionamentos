# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-10-25 14:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('descricao_categoria', models.CharField(max_length=100)),
            ],
        ),
    ]
