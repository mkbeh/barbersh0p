from django.conf.urls import url
from news.views import NewsListView, NewDetailView, NewCreate, NewUpdate, NewDelete
from django.contrib.auth.decorators import user_passes_test


urlpatterns = [
    url(r'^$', NewsListView.as_view(), name="news_index"),
    url(r'^(?P<pk>\d+)/$', NewDetailView.as_view(), name="news_detail"),
    url(r'^add/$', user_passes_test(lambda u: u.is_superuser)(NewCreate.as_view()), name="new_add"),
    url(r'^(?P<pk>\d+)/edit/$', user_passes_test(lambda u: u.is_superuser)(NewUpdate.as_view()), name="news_edit"),
    url(r'^(?P<pk>\d+)/delete/$', NewDelete.as_view(), name="news_delete"),
]