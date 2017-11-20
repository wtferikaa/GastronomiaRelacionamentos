from django.shortcuts import render
from aulas.models import Aula

def aulas_concluidas (request):
    return render(request, 'main_app_aulas/aulas-concluidas.html', {})

def planejar_aulas (request):
    return render (request, 'main_app_aulas/planejar-aulas.html', {})
