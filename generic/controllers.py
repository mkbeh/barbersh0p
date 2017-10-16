from django.views.generic.base import View


# получает номер страницы и добавляет его к интернет-адерсу переадресации после успешного
# сохранения или удаления записи
class PageNumberView(View):

    def post(self, request, *args, **kwargs):
        try:
            pn = request.GET["page"]
        except KeyError:
            pn = "1"

        self.success_url = self.success_url + "?page=" + pn

        return  super(PageNumberView, self).post(request, *args, **kwargs)