from rest_framework import serializers
from .models import Classificacao

class ClassificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classificacao
        fields = [
            'id_classificacao',
            'descricao_classificacao',
        ]

    def validate(self, data):
        descricacao_classificacao = data['descricao_classificacao']
        descricacao_classificacao.lower()
        return data
