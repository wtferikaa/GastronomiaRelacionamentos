from .serializers import UnidadeMedidaSerializer
from .models import UnidadeMedida

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateUnidadeMedida(APIView):
    serializer_class = UnidadeMedidaSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListUnidadeMedida(APIView):
    serializer_class = UnidadeMedidaSerializer

    def get(self, request, format=None):
        serializer = self.serializer_class(UnidadeMedida.objects.all(), many=True)
        return Response(serializer.data)


class DetailsUnidadeMedida(APIView):
    serializer_class = UnidadeMedidaSerializer

    def get(self, request, id, format=None):
        serializer = self.serializer_class(UnidadeMedida.objects.get(id_unidade_medida=id))
        return Response(serializer.data)

    def put(self, request, id, format=None):
        serializer = self.serializer_class(UnidadeMedida.objects.get(id_unidade_medida=id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        UnidadeMedida.objects.get(id_unidade_medida=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
