from django.conf.urls import url

from .views import (
    CreateClassificacao,
    ListClassificacao,
    EditClassificacao,
    DeleteClassificacao
)

urlpatterns = [
    url(r'^create/$', CreateClassificacao.as_view(), name='create'),
    url(r'^list/$', ListClassificacao.as_view(), name='list'),
    url(r'^edit/(?P<id>[0-9]+)$', EditClassificacao.as_view(), name='edit'),
    url(r'^delete/(?P<id>[0-9]+)$', DeleteClassificacao.as_view(), name='delete'),
]
