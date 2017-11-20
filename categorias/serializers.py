from rest_framework import serializers
from .models import Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = [
            'id_categoria',
            'descricao_categoria'
        ]

    def validate(self, data):
        descricao_categoria = data['descricao_categoria']
        descricao_categoria.lower()
        return data

