from rest_framework import serializers
from .models import UnidadeMedida

class UnidadeMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadeMedida
        fields = [
            'id_unidade_medida',
            'simbolo_unidade_medida',
            'descricao_unidade_medida'
        ]
        
    def validate(self, data):
        simbolo = data['simbolo_unidade_medida']
        descricao = data['descricao_unidade_medida']
        simbolo_qs = UnidadeMedida.objects.filter(simbolo_unidade_medida=simbolo_unidade_medida)
        descricao_qs = UnidadeMedida.objects.filter(descricao_unidade_medida=descricao_unidade_medida)
        if simbolo_qs.exists():
            raise serializers.ValidationError('Já existe este simbolo cadastrado')
        elif descricao_qs.exists():
            raise serializers.ValidationError('Já existe esta descrição cadastrada')
        return data
