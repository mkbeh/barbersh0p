from django.conf.urls import url
from userManagement.views import login, logout, registration


urlpatterns = [
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^registration/', registration, name='registration')
]