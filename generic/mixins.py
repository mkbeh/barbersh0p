from django.views.generic.base import ContextMixin


class CategoryListMixin(ContextMixin):

    def get_context_data(self, **kwargs):
        context = super(CategoryListMixin, self).get_context_data(**kwargs)
        context["current_url"] = self.request.path
        return context


# будет помещать номер страницы в особую переменную контекста данных
# когда юзер заканчивает правку новости или подтверждает ее удаление нажатием соотв. кнопки
# в форме, он будет вновь перенаправлен на ту страницу списка, с которой он перешел на страницу
# правки или удаления новости
class PageNumberMixin(CategoryListMixin):

    def get_context_data(self, **kwargs):
        context = super(PageNumberMixin, self).get_context_data(**kwargs)
        try:
            context["pn"] = self.request.GET["page"]
        except KeyError:
            context["pn"] = "1"

        return context
