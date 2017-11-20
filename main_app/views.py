from django.shortcuts import render
from ingredientes.models import Ingrediente


def estoque (request):
    return render(request, 'main_app/estoque.html', {})