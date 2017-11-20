from django.conf.urls import url
from .views import CreateAula, ListAula, EditAula, DeleteAula
from .views import CreateIngrediente, ListIngrediente, EditIngrediente, DeleteIngrediente
from .views import CreateReceita, ListReceita, EditReceita, DeleteReceita
#from .views import CreateAulaIngrediente, ListAulaIngrediente, EditAulaIngrediente, DeleteAulaIngrediente
from .views import CreateAulaReceita, ListAulaReceita, EditAulaReceita, DeleteAulaReceita
from .views import CreateReceitaIngrediente, ListReceitaIngrediente, EditReceitaIngrediente, DeleteReceitaIngrediente

urlpatterns = [
    url(r'^aula/create/$', CreateAula.as_view(), name='create'),
    url(r'^aula/list/$', ListAula.as_view(), name='list'),
    url(r'^aula/edit/(?P<id>[0-9]+)$', EditAula.as_view(), name='edit'),
    url(r'^aula/delete/(?P<id>[0-9]+)$', DeleteAula.as_view(), name='delete'),

    url(r'^ingrediente/create/$', CreateIngrediente.as_view(), name='create'),
    url(r'^ingrediente/list/$', ListIngrediente.as_view(), name='list'),
    url(r'^ingrediente/edit/(?P<id>[0-9]+)$', EditIngrediente.as_view(), name='edit'),
    url(r'^ingrediente/delete/(?P<id>[0-9]+)$', DeleteIngrediente.as_view(), name='delete'),

    url(r'^receita/create/$', CreateReceita.as_view(), name='create'),
    url(r'^receita/list/$', ListReceita.as_view(), name='list'),
    url(r'^receita/edit/(?P<id>[0-9]+)$', EditReceita.as_view(), name='edit'),
    url(r'^receita/delete/(?P<id>[0-9]+)$', DeleteReceita.as_view(), name='delete'),


    url(r'^aula_receita/create/$', CreateAulaReceita.as_view(), name='create'),
    url(r'^aula_receita/list/$', ListAulaReceita.as_view(), name='list'),
    url(r'^aula_receita/edit/(?P<id>[0-9]+)$', EditAulaReceita.as_view(), name='edit'),
    url(r'^aula_receita/delete/(?P<id>[0-9]+)$', DeleteAulaReceita.as_view(), name='delete'),


    url(r'^receita_ingrediente/create/$', CreateReceitaIngrediente.as_view(), name='create'),
    url(r'^receita_ingrediente/list/$', ListReceitaIngrediente.as_view(), name='list'),
    url(r'^receita_ingrediente/edit/(?P<id>[0-9]+)$', EditReceitaIngrediente.as_view(), name='edit'),
    url(r'^receita_ingrediente/delete/(?P<id>[0-9]+)$', DeleteReceitaIngrediente.as_view(), name='delete'),
     

]