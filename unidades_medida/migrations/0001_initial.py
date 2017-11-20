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
            name='UnidadeMedida',
            fields=[
                ('id_unidade_medida', models.AutoField(primary_key=True, serialize=False)),
                ('simbolo_unidade_medida', models.CharField(max_length=4)),
                ('descricao_unidade_medida', models.CharField(max_length=20)),
            ],
        ),
    ]
