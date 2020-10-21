# Create your views here.
from django.http.response import HttpResponse
def prueba(request):
    return HttpResponse("Hola, mundo")