from django.shortcuts import render

from .serializers import CategoriaSerializer
from .models import Categoria

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateCategoria(APIView):
    serializer_class = CategoriaSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListCategoria(APIView):
    serializer_class = CategoriaSerializer

    def get(self, request, format=None):
        serializer = self.serializer_class(Categoria.objects.all(), many=True)
        return Response(serializer.data)


class EditCategoria(APIView):
    serializer_class = CategoriaSerializer

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Categoria.objects.get(id_categoria=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(Categoria.objects.get(id_categoria=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteCategoria(APIView):
    serializer_class = CategoriaSerializer

    def get(self, request, id, format=None):
        serializer = self.serializer_class(Categoria.objects.get(id_categoria=id))
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        Categoria.objects.get(id_categoria=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)