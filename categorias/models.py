from django.db import models

class Categoria (models.Model):
    id_categoria = models.AutoField(primary_key = True)
    descricao_categoria = models.CharField(max_length = 100)