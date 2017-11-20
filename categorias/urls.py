from django.conf.urls import url

from .views import CreateCategoria,ListCategoria, EditCategoria, DeleteCategoria


urlpatterns = [
    url(r'^create/$', CreateCategoria.as_view(), name='create'),
    url(r'^list/$', ListCategoria.as_view(), name='list'),
    url(r'^edit/(?P<id>[0-9]+)$', EditCategoria.as_view(), name='edit'),
    url(r'^delete/(?P<id>[0-9]+)$', DeleteCategoria.as_view(), name='delete'),
]



