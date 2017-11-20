from django.shortcuts import render
from receitas.models import Receita

def nova_receita (request):
    return render(request, 'main_app_receitas/nova-receita.html', {})

def receita_detalhes (request):
    return render(request, 'main_app_receitas/receitas-detalhes.html', {})

def receitas (request):
    return render(request, 'main_app_receitas/receitas.html', {})