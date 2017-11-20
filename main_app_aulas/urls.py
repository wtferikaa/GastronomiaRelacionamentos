from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^aulas_concluidas$', views.aulas_concluidas),
    url(r'^planejar_aulas$', views.planejar_aulas),
]
