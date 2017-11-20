from django.shortcuts import render

from .serializers import (CreateAulaSerializer, ListAulaSerializer, EditAulaSerializer, 
                           CreateIngredienteSerializer, ListIngredienteSerializer, EditIngredienteSerializer,
                           CreateReceitaSerializer, ListReceitaSerializer, EditReceitaSerializer, 
                           AulaReceitaSerializer, ReceitaIngredienteSerializer)

from .models import Aula, Ingrediente, Receita, ReceitaIngrediente, AulaReceita

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


#view da aula 
class CreateAula(APIView):
    queryset = Aula.objects.all()
    serializer_class = CreateAulaSerializer
    
    

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListAula(APIView):
    queryset = Aula.objects.all()
    serializer_class = ListAulaSerializer
   

    def get(self, request, format=None):
        serializer = self.serializer_class(Aula.objects.all(), many=True)
        return Response(serializer.data)


class EditAula(APIView):
    queryset = Aula.objects.all()
    serializer_class = EditAulaSerializer
   

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Aula.objects.get(id_aula=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(Aula.objects.get(id_aula=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAula(APIView):
    queryset = Aula.objects.all()
    serializer_class = ListAulaSerializer
   

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Aula.objects.get(id_aula=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        Aula.objects.get(id_aula=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#view do ingrediente

class CreateIngrediente(APIView):
    queryset = Ingrediente.objects.all()
    serializer_class = CreateIngredienteSerializer
    

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListIngrediente(APIView):
    queryset = Ingrediente.objects.all()
    serializer_class = ListIngredienteSerializer
    
    
    
    def get(self, request, format=None):
        serializer = self.serializer_class(Ingrediente.objects.all(), many=True)
        return Response(serializer.data)


class EditIngrediente(APIView):
    queryset = Ingrediente.objects.all()
    serializer_class = EditIngredienteSerializer
  

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Ingrediente.objects.get(id_ingrediente=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(Ingrediente.objects.get(id_ingrediente=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteIngrediente(APIView):
    queryset = Ingrediente.objects.all()
    serializer_class = ListIngredienteSerializer
    

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Ingrediente.objects.get(id_ingrediente=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        Ingrediente.objects.get(id_ingrediente=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#view da receita

class CreateReceita(APIView):
    queryset = Receita.objects.all()
    serializer_class = CreateReceitaSerializer
    

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListReceita(APIView):
    queryset = Receita.objects.all()
    serializer_class = ListReceitaSerializer
    
    
    
    def get(self, request, format=None):
        serializer = self.serializer_class(Receita.objects.all(), many=True)
        return Response(serializer.data)


class EditReceita(APIView):
    queryset = Receita.objects.all()
    serializer_class = EditReceitaSerializer
  

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Receita.objects.get(id_receita=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(Receita.objects.get(id_receita=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteReceita(APIView):
    queryset = Receita.objects.all()
    serializer_class = ListReceitaSerializer
    

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Receita.objects.get(id_receita=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        Receita.objects.get(id_receita=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


'''# view aula ingrediente 
class CreateAulaIngrediente(APIView):
    queryset = AulaIngrediente.objects.all()
    serializer_class = AulaIngredienteSerializer
    #permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListAulaIngrediente(APIView):
    queryset = AulaIngrediente.objects.all()
    serializer_class = AulaIngredienteSerializer
    #permission_classes = (IsAuthenticated,)
    
    
    def get(self, request, format=None):
        serializer = self.serializer_class(AulaIngrediente.objects.all(), many=True)
        return Response(serializer.data)


class EditAulaIngrediente(APIView):
    queryset = AulaIngrediente.objects.all()
    serializer_class = AulaIngredienteSerializer
    #permission_classes = (IsAuthenticated,)

    def get(self, request, id, format=None):
        serializer = self.serializer_class(AulaIngrediente.objects.get(id_aula_ingrediente=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(AulaIngrediente.objects.get(id_aula_ingrediente=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAulaIngrediente(APIView):
    queryset = AulaIngrediente.objects.all()
    serializer_class = AulaIngredienteSerializer
    #permission_classes = (IsAuthenticated,)

    def get(self, request, id, format=None):
        serializer = self.serializer_class(AulaIngrediente.objects.get(id_aula_ingrediente=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        AulaIngrediente.objects.get(id_aula_ingrediente=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''

#view da aula receita 
class CreateAulaReceita(APIView):
    queryset = AulaReceita.objects.all()
    serializer_class = AulaReceitaSerializer
    

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListAulaReceita(APIView):
    queryset = AulaReceita.objects.all()
    serializer_class = AulaReceitaSerializer
    
    
    
    def get(self, request, format=None):
        serializer = self.serializer_class(AulaReceita.objects.all(), many=True)
        return Response(serializer.data)


class EditAulaReceita(APIView):
    queryset = AulaReceita.objects.all()
    serializer_class = AulaReceitaSerializer
    

    def get(self, request, id, format=None):
        serializer = self.serializer_class(AulaReceita.objects.get(id_aula_receita=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(AulaReceita.objects.get(id_aula_receita=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAulaReceita(APIView):
    queryset = AulaReceita.objects.all()
    serializer_class = AulaReceitaSerializer
    
    def get(self, request, id, format=None):
        serializer = self.serializer_class(AulaReceita.objects.get(id_aula_receita=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        AulaReceita.objects.get(id_aula_receita=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#view da receita ingrediente 
class CreateReceitaIngrediente(APIView):
    queryset = ReceitaIngrediente.objects.all()
    serializer_class = ReceitaIngredienteSerializer
    

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListReceitaIngrediente(APIView):
    queryset = ReceitaIngrediente.objects.all()
    serializer_class = ReceitaIngredienteSerializer
    
    
    
    def get(self, request, format=None):
        serializer = self.serializer_class(ReceitaIngrediente.objects.all(), many=True)
        return Response(serializer.data)


class EditReceitaIngrediente(APIView):
    queryset = ReceitaIngrediente.objects.all()
    serializer_class = ReceitaIngredienteSerializer
    

    def get(self, request, id, format=None):
        serializer = self.serializer_class(ReceitaIngrediente.objects.get(id_receita_ingrediente=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(ReceitaIngrediente.objects.get(id_receita_ingrediente=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteReceitaIngrediente(APIView):
    queryset = ReceitaIngrediente.objects.all()
    serializer_class = ReceitaIngredienteSerializer
    
    def get(self, request, id, format=None):
        serializer = self.serializer_class(ReceitaIngrediente.objects.get(id_receita_ingrediente=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
       ReceitaIngrediente.objects.get(id_receita_ingrediente=id).delete()
       return Response(status=status.HTTP_204_NO_CONTENT)

