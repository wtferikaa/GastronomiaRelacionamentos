from django.conf.urls import url

from .views import CreateUnidadeMedida, ListUnidadeMedida, DetailsUnidadeMedida

urlpatterns = [
    url(r'^create/$', CreateUnidadeMedida.as_view(), name='create'),
    url(r'^list/$', ListUnidadeMedida.as_view(), name='list'),
    url(r'^details/(?P<id>[0-9]+)$', DetailsUnidadeMedida.as_view(), name='details'),
]
