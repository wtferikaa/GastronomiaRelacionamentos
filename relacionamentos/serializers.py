from decimal import *
from rest_framework import serializers
from unidades_medida.serializers import UnidadeMedidaSerializer
from categorias.serializers import CategoriaSerializer
from classificacoes.serializers import ClassificacaoSerializer
from .models import Aula, Ingrediente, Receita, ReceitaIngrediente, AulaReceita
from django.db import transaction
from drf_writable_nested import WritableNestedModelSerializer

#serializers do ingrediente 
class CreateIngredienteSerializer(serializers.ModelSerializer):
    id_unidade_medida = UnidadeMedidaSerializer
    class Meta:
        model = Ingrediente
        fields = [
            'id_ingrediente',
            'nome_ingrediente',
            'quantidade_calorica_ingrediente',
            'aproveitamento_ingrediente',
            'id_unidade_medida'
        ]
    
    def validate(self, data):
        nome_ingrediente = data['nome_ingrediente']
        quantidade_calorica_ingrediente = Decimal(data['quantidade_calorica_ingrediente'])
        aproveitamento_ingrediente = Decimal(data['aproveitamento_ingrediente'])
        nome_qs = Ingrediente.objects.filter(nome_ingrediente=nome_ingrediente)
        
        if nome_qs.exists():
            raise serializers.ValidationError('Já existe um ingrediente cadastrado com este nome')
        elif quantidade_calorica_ingrediente < 0:
            raise serializers.ValidationError('O campo quantidade calorica não pode ser negativo')
        elif aproveitamento_ingrediente < 0:
            raise serializers.ValidationError('O campo aproveitamento ingrediente não pode ser negativo')
        elif aproveitamento_ingrediente > 100:
            raise serializers.ValidationError('O aproveitamento não pode ser acima de 100')
        return data 
      

class ListIngredienteSerializer(serializers.ModelSerializer):
    id_unidade_medida = UnidadeMedidaSerializer
    class Meta:
        model = Ingrediente
        fields = [
            'id_ingrediente',
            'nome_ingrediente',
            'quantidade_calorica_ingrediente',
            'aproveitamento_ingrediente',
            'quantidade_estoque_ingrediente',
            'quantidade_reservada_ingrediente',
            'valor_ingrediente',
            'motivo_retirada_estoque',
            'id_unidade_medida'
        ]

class EditIngredienteSerializer(serializers.ModelSerializer):
    id_unidade_medida = UnidadeMedidaSerializer
    class Meta:
        model = Ingrediente
        fields = [
            'id_ingrediente',
            'nome_ingrediente',
            'quantidade_calorica_ingrediente',
            'aproveitamento_ingrediente',
            'quantidade_estoque_ingrediente',
            #quantidade_reservada_ingrediente
            'valor_ingrediente',
            'motivo_retirada_estoque',
            'id_unidade_medida'
        ]

#validação do edit do ingrediente 
def validate(self, data):
        quantidade_calorica_ingrediente = Decimal(data['quantidade_calorica_ingrediente'])
        aproveitamento_ingrediente = Decimal(data['aproveitamento_ingrediente'])
        valor_ingrediente = Decimal(data['valor_ingrediente'])

        if quantidade_calorica_ingrediente < 0:
            raise serializers.ValidationError('O campo quantidade calorica não pode ser negativo')
        elif aproveitamento_ingrediente < 0:
            raise serializers.ValidationError('O Campo aproveitamento não pode ser negativo')
        elif aproveitamento_ingrediente > 100:
            raise serializers.ValidationError('O aproveitamento não pode ser acima de 100')
        elif valor_ingrediente < 0:
            raise serializers.ValidationError('O campo valor ingrediente não pode ser negativo')
        return data

def update(self, instance, validated_data):
        instance.nome_ingrediente = validated_data.get('nome_ingrediente', instance.nome_ingrediente)
        instance.quantidade_calorica_ingrediente = validated_data.get('quantidade_calorica_ingrediente', instance.quantidade_calorica_ingrediente)
        instance.aproveitamento_ingrediente = validated_data.get('aproveitamento_ingrediente', instance.aproveitamento_ingrediente)
        instance.valor_ingrediente = validated_data.get('valor_ingrediente', instance.valor_ingrediente)
        instance.motivo_retirada_estoque = validated_data.get('motivo_retirada_estoque', instance.motivo_retirada_estoque)
        
        if validated_data.get('quantidade_estoque_ingrediente') > 0:
            print("SOMANDO")
            instance.quantidade_estoque_ingrediente = validated_data.get('quantidade_estoque_ingrediente') + instance.quantidade_estoque_ingrediente
        elif validated_data.get('quantidade_estoque_ingrediente') < 0:
            instance.quantidade_estoque_ingrediente = instance.quantidade_estoque_ingrediente + validated_data.get('quantidade_estoque_ingrediente')
            if instance.quantidade_estoque_ingrediente < 0:
                print("Estoque negativo")
                raise serializers.ValidationError('O estoque não pode ser negativo')
            else:
                print("SUBTRAINDO")
        else:
            print("EDITANDO")
            quantidade_estoque_ingrediente = validated_data.get('quantidade_estoque_ingrediente', instance.quantidade_estoque_ingrediente)
        instance.save()
        return instance



#serializer da receita
class CreateReceitaSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer
    classificacoes = ClassificacaoSerializer
    class Meta:
        model = Receita
        fields = [
            'id_receita',
            'id_categoria',
            'id_classificacao',
            'nome_receita',
            'modo_preparo_receita',
            'ingredientes',

        ]
    def validade (self, data):
        nome_receita = data['nome_receita']
        modo_preparo_receita = data['modo_preparo_receita']
        nome_receita_qs = Receita.objects.filter(nome_receita=nome_receita)

        if nome_receita_qs.exists():
            raise serializers.ValidationError('Já existe uma receita cadastrada com este nome')
        elif nome_receita > 100:
            raise serializers.ValidationError('O nome da receita não pode ter mais de 100 caracteres')
        return data 

class ListReceitaSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer
    classificacoes = ClassificacaoSerializer
    class Meta:
        model = Receita
        fields = [
            'id_receita',
            'id_categoria',
            'id_classificacao',
            'nome_receita',
            'modo_preparo_receita',
            'ingredientes',
        ]

class EditReceitaSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer
    classificacoes = ClassificacaoSerializer
    class Meta:
        model = Receita
        fields = [
            'id_receita',
            'id_categoria',
            'id_classificacao',
            'nome_receita',
            'modo_preparo_receita'
            'ingredientes',
        ]

    def validade (self, data):
        nome_receita = data['nome_receita']
        modo_preparo_receita = data['modo_preparo_receita']
        nome_receita_qs = Receita.objects.filter(nome_receita=nome_receita)

        if nome_receita_qs.exists():
            raise serializers.ValidationError('Já existe uma receita cadastrada com este nome')
        elif nome_receita > 100:
            raise serializers.ValidationError('O nome da receita não pode ter mais de 100 caracteres')
        return data 



#serializers da aula 
class CreateAulaSerializer(serializers.ModelSerializer):

   
    receitas = ListReceitaSerializer(many=True, read_only=True)
    class Meta:
        model = Aula
        fields = [
            'id_aula',
            'data_aula',
            'descricao_aula',
            'aula_agendada',
            'aula_concluida',
            'periodo_aula',
            'receitas',
            
        ]
    
    #tem que fazer validação da data aqui

class ListAulaSerializer(serializers.ModelSerializer):
    
    receitas = ListReceitaSerializer(many=True, read_only=True)
    class Meta:
        model = Aula
        fields = [
            'id_aula',
            'data_aula',
            'descricao_aula',
            'aula_agendada',
            'aula_concluida',
            'periodo_aula',
            'receitas',
        ]

class EditAulaSerializer(serializers.ModelSerializer):
    
    receitas = ListReceitaSerializer(many=True, read_only=True)
    class Meta:
        model = Aula
        fields = [
            'id_aula',
            'data_aula',
            'descricao_aula',
            'aula_agendada',
            'aula_concluida',
            'periodo_aula',
            'receitas',
        ]

    

'''#serializer da aula ingrediente 
class AulaIngredienteSerializer(WritableNestedModelSerializer):
    class Meta:
        model = AulaIngrediente
        fields = [
            'id_aula',
            'id_ingrediente',
            'quantidade_projetada_aula',
            'quantidade_utilizada_aula',
        ]
'''


#serializers da aula receita 
class AulaReceitaSerializer(WritableNestedModelSerializer):
    class Meta:
        model = AulaReceita
        fields = [
            'id_aula_receita',
            'id_aula',
            'id_receita',
            'quantidade_receita',
            
        ]


#serializer da receita ingrediente 
class ReceitaIngredienteSerializer(WritableNestedModelSerializer):
    class Meta: 
        model = ReceitaIngrediente
        fields = [
            'id_receita_ingrediente',
            'id_receita',
            'id_ingrediente',
            'quantidade_bruta_receita_ingrediente',
            'custo_bruto_receita_ingrediente',
        ]
