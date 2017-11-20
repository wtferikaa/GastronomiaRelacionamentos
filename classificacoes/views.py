from .serializers import ClassificacaoSerializer
from .models import Classificacao

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateClassificacao(APIView):
    serializer_class = ClassificacaoSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListClassificacao(APIView):
    serializer_class = ClassificacaoSerializer

    def get(self, request, format=None):
        serializer = self.serializer_class(Classificacao.objects.all(), many=True)
        return Response(serializer.data)


class EditClassificacao(APIView):
    serializer_class = ClassificacaoSerializer

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Classificacao.objects.get(id_classificacao=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(Classificacao.objects.get(id_classificacao=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteClassificacao(APIView):
    serializer_class = ClassificacaoSerializer

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Classificacao.objects.get(id_classificacao=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        Classificacao.objects.get(id_classificacao=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
