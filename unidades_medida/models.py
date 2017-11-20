from django.db import models

class UnidadeMedida(models.Model):
    id_unidade_medida = models.AutoField(primary_key = True)
    simbolo_unidade_medida = models.CharField(max_length = 4)
    descricao_unidade_medida = models.CharField(max_length = 20)
