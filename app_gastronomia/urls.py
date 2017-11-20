from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/unidadesmedida/', include('unidades_medida.urls')),
    #url(r'^api/ingredientes/', include('ingredientes.urls')),
    #url(r'^api/aula/', include('aulas.urls')),
    #url(r'^api/aula_receita/', include('aulas_receitas.urls')),
    #url(r'^api/aula_ingrediente/', include('aulas_ingredientes.urls')),
    url(r'^api/categoria/', include('categorias.urls')),
    url(r'^api/classificacao/', include('classificacoes.urls')),
    #url(r'^api/receita/', include('receitas.urls')),
    url(r'^estoque', include('main_app.urls')),
    url(r'', include('main_app_aulas.urls')),
    url(r'', include('main_app_index.urls')),
    url(r'', include('main_app_receitas.urls')),
    url(r'^api/', include('relacionamentos.urls')),
    
   
]
