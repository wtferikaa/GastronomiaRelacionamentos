from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^nova_receita$', views.nova_receita),
    url(r'^receita_detalhes$', views.receita_detalhes),
    url(r'^receitas$', views.receitas),
]


