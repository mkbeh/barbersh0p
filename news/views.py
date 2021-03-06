from django.views.generic.dates import ArchiveIndexView
from django.views.generic.detail import DetailView
from news.models import New
from generic.mixins import PageNumberMixin
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from generic.controllers import PageNumberView


# доступ к админке только у суперпользователя, лучше добавить во все контроллеры
class NewsListView(ArchiveIndexView):
    model = New
    date_field = "posted"
    template_name = "news_index.html"
    paginate_by = 2
    allow_empty = True
    allow_future = True  # чтобы новости созданные сегодня присутствовали в списке новостей


class NewDetailView(DetailView, PageNumberMixin):
    model = New
    template_name = "new.html"


class NewCreate(SuccessMessageMixin, CreateView):
    model = New
    template_name = "new_add.html"
    success_url = reverse_lazy("news_index")
    success_message = "Новость успешно создана"
    fields = '__all__'


class NewUpdate(SuccessMessageMixin, PageNumberView, UpdateView, PageNumberMixin):
    model = New
    template_name = "new_edit.html"
    success_url = reverse_lazy("news_index")
    success_message = "Новость успешно изменена"
    fields = '__all__'


class NewDelete(PageNumberView, DeleteView, PageNumberMixin):
    model = New
    template_name = "new_delete.html"
    success_url = reverse_lazy("news_index")

    def post(self, request, *args, **kwargs):
        messages.add_message(request, messages.SUCCESS, "Новость успешно удалена")
        return super(NewDelete, self).post(request, *args, **kwargs)