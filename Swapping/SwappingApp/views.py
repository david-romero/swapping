# Create your views here.
from social_auth.admin import username_field
from boto.gs.user import User
from ajaxuploader import models
from rest_framework.tests.models import Person
import json 
from django.http import HttpResponse
from django.core.mail import *
import string
import random
from itertools import chain 
from datetime import date
from taggit.models import Tag
from sre_constants import CATEGORY
from collections import Counter
from django.db.models import Q
from SwappingApp.paypal import *

#handler500 = curry(server_error, template_name='500.html')
#handler404 = curry(page_not_found, template_name='500.html')
#handler403 = curry(permission_denied, template_name='500.html')


"""
def EncuestaResultado(request):
    
        Obtiene el total de respuestas para una encuesta
        Se utiliza a la hora de mostrar todas las encuestas en lista, mostrar para cada encuesta
        cuantos resultados tiene.
    
    encuesta_id = request.GET.get('x_encuesta')
    n_respuestas = Respuesta.objects.filter(x_encuesta_id=encuesta_id).values('t_token_usuario')
    n_respuestas.query.add_count_column()
    n_respuestas.query.group_by = ['t_token_usuario']
    #n_respuestas.query.order_by=['t_token_usuario']
    p = n_respuestas.count()

    response_data = dict()
    response_data['TotalRespuesta'] = str(p)

    return HttpResponse(json.dumps(response_data), content_type="application/json")
    """
from ajaxuploader.views import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.middleware.csrf import get_token
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.context_processors import csrf

from rest_framework import generics, filters, views, status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response

import csv

#from django.core import serializers
from django.db import transaction


from django.core.exceptions import ObjectDoesNotExist
import django_filters
import logging
from django.contrib.sites.models import get_current_site
from django.db.models import Count
import datetime
from django.http import HttpResponseRedirect
from django.http.response import *
from django.core.urlresolvers import reverse
from django.shortcuts import render_to_response
from django.contrib.auth.hashers import make_password
import django_filters
from SwappingApp.models import *
from SwappingApp.models import Product
from SwappingApp.serializersDjango import *
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect
from SwappingApp.forms import *
from json import dumps, loads
from django.core import serializers

def init(request):
    """
        Elimina la sesion y redirige a login.html

        @type request: RequestContext
        @param request: Peticion del cliente.

        @rtype: HttpResponse
        @return: Devuelve una respuesta HTTP. Redirige a login.html

    """
    #logout(request)
    return render_to_response('home.html', context_instance=RequestContext(request))


from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def home(request):
    return render_to_response('home.html', {},
                                          context_instance=RequestContext(request))
@ensure_csrf_cookie
def paypal_transaction_success(request):
    return render_to_response('home.html', {'paypal_success':True},
                                          context_instance=RequestContext(request))
    
    
def auth_login(request):
    username = request.POST['username']
    password = request.POST['password']
    print make_password(password)
    """ This is for testing
    """
    user_app = UserApp.objects.get(id=2)
    print "pasaste user"
#    item1 = Item.objects.get(id=1)
 #   item2 = Item.objects.get(id=2)
    print "pasaste items"
 #   request.session['carrito'] = [item1,item2]
    """
        End tesintg
    """
    print "pasaste carrito"
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            # Redirect to a success page.
            print 'Success'
            request.session['carrito'] = []
            data = serializers.serialize("json", [user])
            return HttpResponse(json.dumps(data), content_type="application/json")
        else:
            # Return a 'disabled account' error message
            print 'disabled account'
            return HttpResponseGone()
    else:
        # Return an 'invalid login' error message.
        print 'invalid login'
        return HttpResponseForbidden()
@csrf_protect
def send_credits(request):
    if request.POST is None:
        return render_to_response('home.html', {}, context_instance=RequestContext(request))
    else:
        credits = request.POST['credits']
        user = request.user
        price = 1
        
        total = credits*price
        
        response = payment_credits(request, total, credits);
        print response
        return  HttpResponse(dumps({"url":response}), content_type="application/json")
    
@csrf_protect
def create_user(request):
    if request.POST is None:
        return render_to_response('home.html', {}, context_instance=RequestContext(request))
    else:
         form = UserForm(request.POST)
         print 'llegamos'
         if form.is_valid(): 
             print "entra en el if"
             user = form.save(commit=False)
             user.last_login = datetime.datetime.now()
             user.date_joined = datetime.datetime.now()
             user.is_superuser = False
             user.is_active = False
             user.is_staff = False
             user.password = make_password(user.password)
             user.credits = 0
             user.karmapoints = 0
             user.photo = None
             #Photo Block
             #user.photo = form.cleaned_data['photo'] 
             lang = request.POST['lang']

             user.save()
             response = HttpResponse(dumps({"id":user.id}), content_type="application/json")
             print 'enviamos el mail!!'

             ##We create the validation code!
             val_code = ValidationCode();
             val_code.code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(15))
             val_code.usuario = user.id
             val_code.save()
             
             title = "Swapping: Confirm registration"
             content = "You've joined swapping with username "+ user.username +". Please, click here to confirm your registration: http://127.0.0.1:8000/SwappingApp/confirm/" + str(val_code.code) + "/" + str(user.id)

             if str(lang)=='es' :
                 title = "Swapping: Confirmacion de registro"
                 content = "Se ha unido a Swapping con el usuario "+user.username +". Por favor, haga click aqui para confirmar su registro: http://127.0.0.1:8000/SwappingApp/confirm/"+str(val_code.code) + "/"+str(user.id)
             print 'hemos creado el content'
             send_mail(title, content,"no-reply@swapping.com", [user.email], fail_silently=False)
             print 'ha enviado'
             return response
         
         else:
             print form.errors
             print "entra en el else"
             response_data = {}
             response_data['message'] = 'The username already exists into the system'
             return HttpResponseServerError(json.dumps(response_data), content_type="application/json")
    
    
@csrf_protect
def create_admin(request):
    print "aqui llega"
    if request.POST is None:
        return render_to_response('home.html', {},
                                          context_instance=RequestContext(request))
    else:
        form = AdminForm(request.POST)
        if form.is_valid(): 
            admin = form.save(commit=False)
            admin.last_login = datetime.datetime.now()
            admin.date_joined = datetime.datetime.now()
            admin.is_superuser = True
            admin.is_active = True
            admin.password = make_password(admin.password)
            admin.save()
            return HttpResponse(dumps({"id":admin.id}))
        else:
            print form.errors
            return render_to_response('home.html', form.errors,
                                          context_instance=RequestContext(request))
            return render_to_response('home.html', {},
                                          context_instance=RequestContext(request))
            
    

   
def logout_user(request):
    logout(request)
    return HttpResponse()
    
def import_uploader(request):
    print request    



""" ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// """
""" ///////////////////////////////////////////// ITEM /////////////////////////////////////////////////////////////////////// """    
""" ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// """

def get_user_item(request):
    id_item = request.GET['id_item']
    
    item = Item.objects.get(id=id_item)
    factive = item.user.id
    print "Usuario del item: "
    print factive
    return HttpResponse(json.dumps({"factive":factive}), content_type="application/json")

def items_for_user(request):
    userid = request.GET['user']
    itemsuser = Item.objects.filter(user=userid)
    items = []
    for item in itemsuser:
        i={}
        i['id'] = item.id
        i['title'] = item.title
        i['description'] = item.description
        i['created_on'] = str(item.created_on)
        i['category'] = item.category
        i['price'] = item.price
        img = ItemImage.objects.filter(product=item.id)
        if len(img) > 0:
            i['url'] = img[0].image.url
        else:
            i['url'] = '/static/images/default.jpg'
        items.append(i)
        
    return HttpResponse(json.dumps({"items":items}), content_type="application/json")
    

def get_date_active(request):
    id_item = request.GET['id_item']
    
    item = Item.objects.get(id=id_item)
    factive = str(item.active_on)
    
    return HttpResponse(json.dumps({"factive":factive}), content_type="application/json")

def get_item_first_image(request):
    id_item = request.GET['id_item']
    print(id_item)
    image_item= ItemImage.objects.filter(product=id_item)
    if len(image_item) > 0:
        print image_item[0].image.url
        return HttpResponse(json.dumps({'url':image_item[0].image.url}),content_type="application/json")
    return HttpResponse(json.dumps({}),content_type="application/json")
    
    class Meta:
        model = Complaint
        fields = ['subject', 'affected_user', 'responsible_user',  'swap', 'description', 'response','resolved']
   
from django.core.exceptions import ObjectDoesNotExist

def searh_products(request):
        search = request.GET['search']
        
        if len(search)>1:
            if search[0] == '@':
                search = search[1:]
                users = User.objects.filter((Q(username__contains=search)))
                user_list = []
                if len(users) > 0:
                    for user in users:
                        user_dict = {}
                        user_dict['name'] = user.first_name
                        user_dict['surname'] = user.last_name
                        user_dict['username'] = user.username
                        user_dict['id'] = user.id
                        try:
                            user_temp = UserApp.objects.get(pk=user.id)
                            user_dict['photo'] = user_temp.photo.url
                            user_dict['votes'] = user_temp.karmaPoints
                            user_list.append(user_dict)
                        except ObjectDoesNotExist:
                            user_dict = {}
                    return HttpResponse(json.dumps({"usrlist":user_list,"user":True}), content_type="application/json")
        
        
        items = Item.objects.filter((Q(title__contains=search) | Q(description__contains=search)) & Q(active=True)) 
        hours = Hour.objects.filter((Q(title__contains=search) | Q(description__contains=search)) & Q(active=True))
        estates = Estate.objects.filter((Q(title__contains=search) | Q(description__contains=search)) & Q(active=True))
        cars = Car.objects.filter((Q(title__contains=search) | Q(description__contains=search)) & Q(active=True))
        objlist = [] 
        

        athuser=request.user.is_authenticated()
        hoy = datetime.datetime.now().date()      

        for item in items:
            if item.active_on >= hoy:
                obj= {}
                obj['id'] = item.id
                obj['type'] = 'i'
                img = ItemImage.objects.filter(product=item.id)
                if len(img) > 0:
                    obj['image'] = img[0].image.url
                else:
                    obj['image'] = '/static/images/default.jpg'
                obj['title'] = item.title
                obj['desc'] = item.description
                #user = UserApp.objects.get(id=img.user)
                obj['uname'] =  item.user.username
                obj['userid'] =  item.user.id
                obj['enable'] = str(item.enable_swapping)
                obj['price'] = item.price
                objlist.append(obj)
            
        for hour in hours:
            if hour.active_on >= hoy:
                obj= {}
                obj['id'] = hour.id
                obj['type'] = 'h'
                img = ServiceImage.objects.filter(service=hour.id)
                if len(img) > 0:
                    obj['image'] = img[0].image.url
                else:
                    obj['image'] = '/static/images/default.jpg'
                obj['title'] = hour.title
                obj['desc'] = hour.description
                #user = UserApp.objects.get(id=img.user)
                obj['userid'] =  hour.user.id
                obj['uname'] =  hour.user.username
                obj['enable'] = str(hour.enable_swapping)
                obj['price'] = hour.price
                objlist.append(obj)
            
        for estate in estates:
            if estate.active_on >= hoy:
                obj= {}
                obj['id'] = estate.id
                obj['type'] = 'e'
                img = ServiceImage.objects.filter(service=estate.id)
                if len(img) > 0:
                    obj['image'] = img[0].image.url
                else:
                    obj['image'] = '/static/images/default.jpg'
                obj['title'] = estate.title
                obj['desc'] = estate.description
                #user = UserApp.objects.get(id=img.user)
                obj['userid'] =  estate.user.id
                obj['uname'] =  estate.user.username
                obj['enable'] = str(estate.enable_swapping)
                obj['price'] = estate.price
                objlist.append(obj)
            
        for car in cars:
            if car.active_on >= hoy:
                obj= {}
                obj['id'] = car.id
                obj['type'] = 'c'
                img = ServiceImage.objects.filter(service=car.id)
                if len(img) > 0:
                    obj['image'] = img[0].image.url
                else:
                    obj['image'] = '/static/images/default.jpg'
                obj['title'] = car.title
                obj['desc'] = car.description
                #user = UserApp.objects.get(id=img.user)
                obj['userid'] =  car.user.id
                obj['uname'] =  car.user.username
                obj['enable'] = str(car.enable_swapping)
                obj['price'] = car.price
                objlist.append(obj)
                
        numobj = len(objlist)      
        if len(objlist) > 0:
            numobj = numobj-1
        pag = (len(objlist))/10;
        pag = pag + 1
        return HttpResponse(json.dumps({"objlist":objlist,"athuser":athuser,"pag":pag}), content_type="application/json")

        

@csrf_exempt
def get_item_image(request):
    id_item = request.GET['id_item']
    print 'llegas a recuperar urls'
    photos = ItemImage.objects.filter(product=id_item)
    urls = []
    for photo in photos:
        urls.append(photo.image.url)
    response_data = {}
    response_data['urls'] = urls
    return HttpResponse(json.dumps(response_data), content_type="application/json") 

@csrf_exempt
def upload_item_photo(request):
    print 'llegas foto'
    if request.method == 'POST':
        #print request.POST['item']
        id_item = request.POST['item']
        #print id_item
        item = Item.objects.get(id=id_item)
        for image in request.FILES.getlist('image[]'):
            itemimage = ItemImage(image=image,product=item)
            itemimage.save()
        #item.image=imagesrecived
        #item.save()
        return HttpResponse()
    return HttpResponseForbidden


def getUser(request):
    id=request.user.id
    print(id);
    return HttpResponse(json.dumps({"id":id}), content_type="application/json")   

        
@ensure_csrf_cookie
def create_item(request):
    return render_to_response('items.html', {},context_instance=RequestContext(request))

from taggit.models import TagBase

@csrf_protect
def confirm_create_item(request):
    print 'llegamos al view'
    if request.POST is None:
        return render_to_response('items.html', {}, context_instance=RequestContext(request))
    else:
         if request.FILES is None:
             print("mieeeeeeeeeeeeeeeeeerda")
         wishSwapp = request.POST.get('wishSwap')       
         form = ItemForm(request.POST, request.FILES)
         print form
         if form.is_valid(): 
             
             item = form.save(commit=False)
             item.created_on = datetime.datetime.now()
             item.active_on = datetime.datetime.now()
             item.active = True
             item.wishSwap= wishSwapp
             #item.image = None       
             #print("id de usuario")
             print(request.user.id)
             uap = UserApp.objects.get(id=request.user.id)
             item.user = uap
 
             if item.premium == True:
                uap.credits = uap.credits - 1
                uap.save()
             item.save()          
             words_in_title = item.title.split( );
             words_in_description = item.description.split( );
             words = list(words_in_title + words_in_description)
             bad_words = ["en","es","alli","de","por","ahi","hola","soy"]
             words = [x for x in words if len(x) > 2 ]   
             words = [x for x in words if x not in bad_words]   
             item.tags.add(*words)
             
             item.save()
             
             print "enviamos al controller"
             return HttpResponse(dumps(item.id))
             #{"item":item.id}
         else:
             print "entra en el else"
             response_data = {}
             response_data['message'] = 'Fail'
             return HttpResponseServerError(json.dumps(response_data), content_type="application/json")
     
        #ftitle = request.POST['ftitle']
        #print ftitle
        #fdecrip = request.POST['fdesc']
        #fphoto = request.POST['fphoto']
        #fprice = request.POST['fprice']
        #fenable = request.POST['fenable']
        #fcatego = 'MOTOR'
        #fquantity = request.POST['fquantity']
        #i = Item(title=ftitle, created_on=0, description=fdecrip, image=fphoto, enable_swapping=fenable, quantity=fquantity, category=fcatego, user=u )
        #i.save()

def categories(request):
    listCategories=[] 
    for c in CATEGORY:
        listCategories.append(c[1])
    
    print(listCategories)
    return HttpResponse(json.dumps(listCategories), content_type="application/json")



class ItemFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter()
    title = django_filters.CharFilter()
    price = django_filters.AllValuesFilter()
    swap = django_filters.NumberFilter()
    user = django_filters.NumberFilter()
    class Meta:
        model = Item
        fields = ['id','title', 'price','swap','user']
        
class ItemList(generics.ListCreateAPIView):  
        #Clase creada para la serializacion de listas a JSON para la clase encuestador
    queryset = Item.objects.all()
    model = Item
    serializer_class = ItemSerializer
    filter_fields = ('id','title', 'price','swap','user')
    filter_class = ItemFilter
    #filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('date')

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
        #Clase creada para la serializacion a JSON
    model = Item
    serializer_class = ItemSerializer2
 
    

""" ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// """
""" ///////////////////////////////////////////// ITEM /////////////////////////////////////////////////////////////////////// """    
""" ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// """    

"""Service's views"""
def create_service(request):
    return render_to_response('service.html', {},context_instance=RequestContext(request))


def confirm_create_service(request):
    print('pasa por aqui')
    if request.POST is None:
        return HttpResponse(status=403)
    else:
        service = request.POST['service']
        longitude = request.POST['longitude']
        latitude = request.POST['latitude']
        print longitude
        print latitude
        premium = request.POST.get('premium')
        wishSwap = request.POST.get('wishSwap')          
        venue = Location(latitude=latitude,longitude=longitude)
        venue.save()
        uap = UserApp.objects.get(id=request.user.id)
        premium1 = str(premium)
        
        if premium1 == 'on':
            uap.credits = uap.credits - 1
            uap.save()
            
        if service == 'car': 
            form = CarForm(request.POST,request.FILES)
            if form.is_valid():
                destlongitude = request.POST['dlongitude']
                destlatitude = request.POST['dlatitude']
                destination = Location(latitude=destlatitude,longitude=destlongitude) 
                destination.save()
                car = form.save(commit=False)
                car.created_on = datetime.datetime.now()
                car.active_on = datetime.datetime.now()
                car.venue = venue
                car.wishSwap = wishSwap
                car.image = None
                car.active = True 
                car.destination=destination
                car.user = uap
                car.save()
                
                words_in_title = car.title.split( );
                words_in_description = car.description.split( );
                words = list(words_in_title + words_in_description)
                bad_words = ["en","es","alli","de","por","ahi","hola","soy"]
                words = [x for x in words if x not in bad_words]
                words = [x for x in words if len(x) > 2 ]
                car.tags.add(*words)
                 
                car.save()
                
                return HttpResponse(dumps({"id":car.id}), content_type="application/json")
            else:
                print form.errors
                return HttpResponseBadRequest()
        elif service == 'hour': 
            form = HourForm(request.POST,request.FILES)
            if form.is_valid(): 
                hour = form.save(commit=False)
                hour.created_on = datetime.datetime.now()
                hour.active_on = datetime.datetime.now()
                hour.venue = venue
                hour.wishSwap = wishSwap
                hour.user = uap
                hour.image = None
                hour.active = True  
                hour.save()
                
                words_in_title = hour.title.split( );
                words_in_description = hour.description.split( );
                words = list(words_in_title + words_in_description)
                bad_words = ["en","es","alli","de","por","ahi","hola","soy"]
                words = [x for x in words if x not in bad_words]  
                words = [x for x in words if len(x) > 2 ] 
                hour.tags.add(*words)
                 
                hour.save()
                
                return HttpResponse(dumps({"id":hour.id}), content_type="application/json")
            else:
                print form.errors
                return render_to_response('service.html', form.errors,
                                              context_instance=RequestContext(request))
                return render_to_response('service.html', {},
                                              context_instance=RequestContext(request))
        elif service == 'estate': 
            form = EstateForm(request.POST,request.FILES)
            if form.is_valid(): 
                estate = form.save(commit=False)
                estate.created_on = datetime.datetime.now()
                estate.active_on = datetime.datetime.now()
                estate.wishSwap = wishSwap
                estate.venue = venue
                estate.image = None
                estate.active = True  
                estate.user = uap
                estate.save()
                
                words_in_title = estate.title.split( );
                words_in_description = estate.description.split( );
                words = list(words_in_title + words_in_description)
                bad_words = ["en","es","alli","de","por","ahi","hola","soy"]
                words = [x for x in words if x not in bad_words]
                words = [x for x in words if len(x) > 2 ]  
                estate.tags.add(*words)
                 
                estate.save()
                
                return HttpResponse(dumps({"id":estate.id}), content_type="application/json")
            else:
                print form.errors
                print form.moment
                return HttpResponseBadRequest()
        else:
            return HttpResponseNotFound()
 
@csrf_exempt
def upload_service_photo(request):
    print 'llegas'
    if request.method == 'POST':
        id_service = request.POST['service']
        service = Service.objects.get(id=id_service)
        for image in request.FILES.getlist('image[]'):
            serviceimage = ServiceImage(image=image,service=service)
            serviceimage.save()
        return HttpResponse()
    return HttpResponseForbidden


@csrf_exempt
def get_service_photo(request, pk):
    
    photos = ServiceImage.objects.filter(service=pk)
    urls = []
    for photo in photos:
        urls.append(photo.image.url)
    response_data = {}
    response_data['urls'] = urls
    print urls
    return HttpResponse(json.dumps(response_data), content_type="application/json") 


"""News's views"""
def create_news(request):
    return render_to_response('news.html', {},context_instance=RequestContext(request))


@csrf_protect
def confirm_create_news(request):
    print('news')
    if request.POST is None:
        return HttpResponse(status=403)
    else:
        form = NewsForm(request.POST)
        if form.is_valid():
            print('news') 
            news = form.save(commit=False)
            news.save()
            return HttpResponse(dumps({"id":news.id}), content_type="application/json")
        else:
            print form.errors
            return render_to_response('news.html', form.errors,
                                          context_instance=RequestContext(request))
            return render_to_response('news.html', {},
                                          context_instance=RequestContext(request))
        """tit = request.POST['title']
        decrip = request.POST['desc']
        #admin = request.user
        
        n = News(title=tit, description=decrip)

        n.save()
        return render_to_response('news.html', {},context_instance=RequestContext(request))"""
"""Messages's views"""
def create_message(request):
    return render_to_response('message.html', {},context_instance=RequestContext(request))

@csrf_protect
def confirm_create_message(request):
    print('message')
    if request.POST is None:
        return HttpResponse(status=403)
    else:
        form = MessageForm(request.POST)
        if form.is_valid(): 
            message = form.save(commit=False)
            message.moment = datetime.datetime.now()
            
            uapd = UserApp.objects.get(id=request.POST['id_destination'])
            uapo = UserApp.objects.get(id=request.user.id)
            if uapd != uapo:
                message.destination_user = uapd
                message.origen_user = uapo
                message.save()
            else:
                return HttpResponseForbidden()
            return HttpResponse(dumps({"id":message.id}), content_type="application/json")
        else:
            print form.errors
            return render_to_response('message.html', form.errors,
                                          context_instance=RequestContext(request))
            return render_to_response('message.html', {},
                                          context_instance=RequestContext(request))
'''Comment's view'''
def confirm_create_comment(request):
    if request.POST is None:
        return HttpResponse(status=403)
    else:
        form = CommentForm(request.POST)
        if form.is_valid(): 
            comment = form.save(commit=False)
            comment.moment = datetime.datetime.now()
            
            print(comment.moment)
            uapd = UserApp.objects.get(id=request.POST['id_user'])
            uapo = UserApp.objects.get(id=request.user.id)
            if uapd != uapo:
                comment.target_user = uapd
                comment.user_origin = uapo
                comment.save()
            else:
                return HttpResponseForbidden()
            return HttpResponse(dumps({"id":comment.id}), content_type="application/json")
        else:
            print form.errors
            return render_to_response('home.html', form.errors,
                                          context_instance=RequestContext(request))
            return render_to_response('home.html', {},
                                          context_instance=RequestContext(request))



def confirm_user(request, code, id):
    print code
    print id
    obj = ValidationCode.objects.get(usuario=id)
    print obj
    if obj.code == code:
        print 'es igual!'
        user = UserApp.objects.get(id=id)
        print user.username
        user.is_active = True
        user.save()
        print 'guardado!'
        print 'manda a home!'
        return HttpResponseRedirect("/home")

    
class UserFilter(django_filters.FilterSet):
    first_name = django_filters.CharFilter()
    last_name = django_filters.CharFilter()
    id = django_filters.NumberFilter()
    

    class Meta:
        model = UserApp
        fields = ['username', 'first_name', 'last_name',  'email', 'phone']
        

class UserList(generics.ListCreateAPIView):
    model = UserApp
    serializer_class = UserSerializer

    filter_fields = ('first_name', 'last_name','id')
    filter_class = UserFilter

    def pre_save(self, obj):
        obj.password = make_password(self.request.POST['password'])

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    
    model = UserApp
    serializer_class = UserSerializer
    
    
    
class NewsFilter(django_filters.FilterSet):
    """
        Filtro para cuestionario, buscar a traves de los campos descritos debajo (t_nombre)
    """
    title = django_filters.CharFilter(lookup_type='contains')
    # x_encuestador = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = News
        fields = ['title']
        fields = ['description'] 

        
class NewsList(generics.ListCreateAPIView):
    
        #Clase creada para la serializacion de listas a JSON para la clase encuestador
    
    model = News
    serializer_class = NewsSerializer
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('title', 'description')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = NewsFilter



class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase encuestador
   
    model = News
    serializer_class = NewsSerializer
    #permission_classes = (permissions.IsAuthenticated)
    

class AdministratorFilter(django_filters.FilterSet):
    """
        Person Filter.  (first_name, last_name, l_eliminado)
    """
    first_name = django_filters.CharFilter(lookup_type='contains')
    last_name = django_filters.CharFilter(lookup_type='contains')
    id = django_filters.NumberFilter()
    #l_eliminado = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = Administrator
        fields = ['id','username', 'first_name', 'last_name',  'email']




class AdministratorList(generics.ListCreateAPIView):
    
        #Clase creada para la serializacion de listas a JSON para la clase encuestador
    
    model = Administrator
    serializer_class = AdministratorSerializer
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('first_name', 'last_name','id')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = AdministratorFilter
    
    

    #este metodo encripta
    def pre_save(self, obj):
        obj.password = make_password(self.request.POST['password'])
        
        

class AdministratorDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase encuestador
   
    model = Administrator
    serializer_class = AdministratorSerializer
    #permission_classes = (permissions.IsAuthenticated)

    
    
class ProductFilter(django_filters.FilterSet):
    """
        Filtro para cuestionario, buscar a traves de los campos descritos debajo (t_nombre)
    """
    title = django_filters.CharFilter(lookup_type='contains')
    premium = django_filters.BooleanFilter()
    # x_encuestador = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = Product
        fields = ['title']
        fields = ['price'] 
        fields = ['premium']

        
class ProductList(generics.ListCreateAPIView):
    
        #Clase creada para la serializacion de listas a JSON para la clase encuestador
    
    model = Product
    serializer_class = ProductSerializer
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('title', 'price','premium')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = ProductFilter
    
    



class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase encuestador
   
    model = Product
    serializer_class = ProductSerializer
    #permission_classes = (permissions.IsAuthenticated)
    
    filter_fields = ('subject', 'content')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = ProductFilter
    
    

def get_messages(request):
    
    try:
        messages = Message.objects.all()
        print messages
    except:
        messages = None
    if messages is not None:
            data = serializers.serialize('json', messages)
            print data
            return HttpResponse(data, content_type="application/json")
    else:
        return HttpResponse(json.dumps({}), content_type="application/json")   

class MessageFilter(django_filters.FilterSet):
    """
        Filtro para cuestionario, buscar a traves de los campos descritos debajo (t_nombre)
    """
    subject = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = Message
        #fields = ["subject", "content","moment","destination_user","origen_user"]

        
class MessageList(generics.ListCreateAPIView):
    model = Message
    serializer_class = MessageSerializer

    filter_fields = ('destination_user','origen_user')
    filter_class = MessageFilter

class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
   
    model = Message
    serializer_class = MessageSerializer

class CommentFilter(django_filters.FilterSet):
    content = django_filters.CharFilter(lookup_type='contains')
    
    
    class Meta:
        model = Comment
        #fields = ['target_user']   
        
class CommentList(generics.ListCreateAPIView):
    model = Comment
    queryset = Comment.objects.order_by('-moment')
    serializer_class = CommentSerializer 
    filter_fields = ('target_user')
    #filter_backend = (filters.OrderingFilter)
    #ordering = ('moment',)
    filter_class = CommentFilter
    paginate_by = 3
    paginate_by_param = 'page_size'
    max_paginate_by = 100

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
   
    model = Comment
    serializer_class = CommentSerializer
    
class HourFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = Hour
        #fields = ['user']

        
class HourList(generics.ListCreateAPIView):

        #Clase creada para la serializacion de listas a JSON para la clase Service
    model = Hour
    serializer_class = HourSerializer
    queryset = Hour.objects.order_by('-created_on')
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('user')
    #filter_backend = (filters.OrderingFilter)
    #ordering = ('moment',)
    filter_class = HourFilter
    
class HourDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Hour
    serializer_class = HourSerializer
    #permission_classes = (permissions.IsAuthenticated)    

class CarFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = Car
        #fields = ['user']

        
class CarList(generics.ListCreateAPIView):

        #Clase creada para la serializacion de listas a JSON para la clase Service
    model = Car
    serializer_class = CarSerializer
    #permission_classes = (permissions.IsAuthenticated)
    queryset = Car.objects.order_by('-created_on')
    filter_fields = ('user')
    #filter_backend = (filters.OrderingFilter)
    #ordering = ('moment',)
    filter_class = CarFilter

class CarDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Car
    serializer_class = CarSerializer
    #permission_classes = (permissions.IsAuthenticated) 
    
class EstateFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_type='contains')

    class Meta:
        model = Estate
        #fields = ['user']

        
class EstateList(generics.ListCreateAPIView):

        #Clase creada para la serializacion de listas a JSON para la clase Service
    model = Estate
    serializer_class = EstateSerializer
    #permission_classes = (permissions.IsAuthenticated)
    queryset = Estate.objects.order_by('-created_on')

    filter_fields = ('user')
    #filter_backend = (filters.OrderingFilter)
    #ordering = ('moment',)
    filter_class = EstateFilter

class EstateDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Estate
    serializer_class = EstateSerializer
    #permission_classes = (permissions.IsAuthenticated)
    
class LocationFilter(django_filters.FilterSet):
    #latitude = django_filters.FloatField(lookup_type='contains')

    class Meta:
        model = Location
        fields = ['latitude']
        fields = ['longitude'] 

        
class LocationList(generics.ListCreateAPIView):

        #Clase creada para la serializacion de listas a JSON para la clase Service
    model = Location
    serializer_class = LocationSerializer
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('latitude', 'longitude')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = LocationFilter

class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Location
    serializer_class = LocationSerializer
    #permission_classes = (permissions.IsAuthenticated)
    

    
def get_items_in_session(request):
    if request.is_ajax() and request.method == 'GET':
        data = {}
        if 'carrito'  in request.session:
            if len(request.session['carrito']) > 0:
                data = serializers.serialize('json', request.session['carrito'])
                indices = [m.start() for m in re.finditer('\"user\": [0-9]', data)]
                print indices
                print data[indices[0]+4+4] # this is the id
                id = int(data[indices[0]+4+4])
                userApp = UserApp.objects.get(id=id)
                data = data.replace('"user": ' + str(id), '\"user\": "' + str(id) + ':' + userApp.username + '"')
                print data   
        return HttpResponse(data, content_type="application/json")
    else:
        return HttpResponseNotAllowed                     


def get_address(request):
    #User loged
    userApp = UserApp.objects.get(id=request.user.id)
    #userApp = UserApp.objects.get()
    print userApp
    print userApp.swap_set.all()
    return HttpResponse(userApp.swap_set.all(), mimetype="application/json")


@csrf_exempt
def upload_user_photo(request):
    print 'llegas'
    print request.POST['user_id']
    id_user = request.POST['user_id']
    user_app = UserApp.objects.get(id=id_user)
    print user_app.photo
    user_app.photo = request.FILES['file']
    user_app.save()
    return HttpResponse()


@csrf_exempt
def get_user_photo(request, pk):
    print 'llegas'
    print 'asdasdasd'
    print pk
    obj = UserApp.objects.get(id=pk)
    if obj.photo == "":
        response_data = {}
        response_data['url'] = "/static/images/default.jpg"
        return HttpResponse(json.dumps(response_data), content_type="application/json")    
    url = obj.photo.url
    print url
    response_data = {}
    response_data['url'] = url
    return HttpResponse(json.dumps(response_data), content_type="application/json")
 

@csrf_exempt
def get_vote_by_voted(request,pk):
    print request.user
    voted_user = UserApp(id=pk)
    print "antes voteuser"
    print request.user
    if str(request.user) == "AnonymousUser":
        return HttpResponse(dumps({"exists": "Anonymous"}), content_type="application/json")
    try:
        voter_user = UserApp.objects.get(username=request.user)
    except:
        return HttpResponse(dumps({"exists": False}), content_type="application/json")

        
    print voter_user.id
    print "voteuser?"
    if (str(voted_user.id)==str(voter_user.id)): #Si votado es igual que quie vota
        return HttpResponse(dumps({"exists": False}), content_type="application/json")

    try:
        print voted_user.id
        vote_obj = c = Vote.objects.filter(voted__id=voted_user.id, voter__id=voter_user.id)
    except:
        print "except"
        vote_obj = None
    
    if vote_obj is None:
        print "no existe"
        return HttpResponse(dumps({"exists": True}), content_type="application/json")
    else:
        res = False
        for vote in vote_obj:
            if vote.voter == voter_user:
                res = True
        
        if res:
            print "if res"
            return HttpResponse(dumps({"exists": False}), content_type="application/json")
        else:
            print "else res"
            return HttpResponse(dumps({"exists": True}), content_type="application/json")
@csrf_protect
def edit_administrator(request):
    if request.method == "POST":
        administrator_id = int(request.POST['pk'])
        print administrator_id
        administrator = Administrator.objects.get(id=administrator_id)
        atributte = request.POST['name']
        value = request.POST['value']
        if atributte == 'phone':
            administrator.phone = value
            administrator.save()
        if atributte == 'first_name':
            administrator.first_name = value
            administrator.save()
        if atributte == 'last_name':
            administrator.last_name = value
            administrator.save()
        if atributte == 'email':
            administrator.email = value
            administrator.save()
        return HttpResponse()
    return HttpResponseForbidden
   
       
def change_password(request, pk):
    
    print "entra en change_password!"
    old_password = request.POST['old_password']
    new_password_1 = request.POST['new_password_1']
    new_password_2 = request.POST['new_password_2']
    #Se edbe controlar la session!!!
    userLogged = UserApp.objects.get(id=pk)
    old_password_converted = make_password(old_password)
    
    print (str(old_password)+","+str(len(str(old_password))))
    
    print old_password_converted
    print userLogged.password
    
    if old_password_converted == userLogged.password:
        print "comprueba bien"
        
        if new_password_1 == new_password_2:
            print "iguales"
            
            userLogged.password = make_password(new_password_1)
            userLogged.save()
            
            return HttpResponseRedirect("/home")

@csrf_protect
def vote_user(request, pk):
    
    print "entra en vote_user!"
    vote = request.POST['vote']
    vote = int(vote)
    print "obtenido vote "+str(vote)
    voter_user_r = request.user
    print voter_user_r
    voter_user = UserApp.objects.get(username=voter_user_r)
    voted_user = UserApp.objects.get(id=pk) 
    
    try:
        vote_object = Vote()
        vote_object.voter = voter_user 
        vote_object.voted = voted_user
        vote_object.date = datetime.datetime.now()
        
        print "guardamos!"
        vote_object.save()
    
        
        voted_user.karmaPoints = voted_user.karmaPoints + int(vote);
        
        if vote==1:
            voted_user.karma_1points= voted_user.karma_1points+1;
        if vote==2:
            voted_user.karma_2points= voted_user.karma_2points+1;    
        if vote==3:
            voted_user.karma_3points= voted_user.karma_3points+1;    
        if vote==4:
            voted_user.karma_4points= voted_user.karma_4points+1;        
        if vote==5:
            voted_user.karma_5points= voted_user.karma_5points+1;    
        
        voted_user.save()
        
        return HttpResponse()
    
    except:
        None

@csrf_protect
def create_complaint(request):
    print"entra en complaints"
    if request.POST is None:
        return render_to_response('home.html', {}, context_instance=RequestContext(request))
    else:
         form = ComplaintForm(request.POST)
         affected_user = request.POST['affected_user']
         responsible_user = request.POST['responsible_user']
         swap = request.POST['swap']
         lang = request.POST['lang']
         
         print(form)
         if form.is_valid(): 
             print "form valido"
             affectedUser = UserApp.objects.get(id=affected_user)
             complaint = form.save(commit=False)
             
             if affected_user is None or len(affected_user) == 0 :
                 response_data = {}
                 response_data['affected'] = 'affected user is not correct'
                 return HttpResponseServerError(json.dumps(response_data), content_type="application/json")

             if swap is not None and len(swap) != 0:

                 try:
                     swapDB = Swap.object.get(id = swap)
                 except :
                     swapDB = None
                     
                 if swapDB is not None:
                     complaint.swap = swapDB;
                 else:
                     response_data = {}
                     response_data['swap'] = 'swap is not correct'
                     return HttpResponseServerError(json.dumps(response_data), content_type="application/json")
                 
             print responsible_user
             if responsible_user is not None and len(responsible_user) != 0 :
                 print "usuario responsable"
                 try:
                     user = UserApp.objects.get(username = responsible_user)
                 except :
                     user = None
                 
                 if user is not None:
                     complaint.responsible_user = user;
                     
                 else:
                     response_data = {}
                     response_data['responsible_user'] = 'The responsible user does not exist'
                     return HttpResponseServerError(json.dumps(response_data), content_type="application/json")
                     
             complaint.affected_user = affectedUser;
                 
             complaint.save();
             
             try:
                 administrators = Administrator.objects.all();
             except:
                 administrators= None
             
             
             if administrators is not None:
                 for administrator in administrators:
                     print "entra en admins"
                     title = "Complaint: "+ complaint.subject+ "("+ affectedUser.username +")";               
                     if str(lang)=='es' :
                         title = "Reclamacion: "+ complaint.subject+ "("+ affectedUser.username +")";
                     send_mail(title, complaint.description,"no-reply@swapping.com", [administrator.email], fail_silently=False)

             response = HttpResponse(dumps({"success": "The complaint "+str(complaint.id)+" was succesfully created"}), content_type="application/json")
             
             return response
         
         else:
             print "entra en el else"
             return HttpResponseServerError(json.dumps(form.errors))

def response_complaint(request):
    if request.POST is None:
        return render_to_response('home.html', {}, context_instance=RequestContext(request))
    else:
        text = request.POST['response']
        complaints = request.POST['id_complaint']
        lang = request.POST['lang']
        
        current_complaint = Complaint.objects.get(id=complaints)
        current_complaint.response = text
        current_complaint.resolved = True
        current_complaint.save()
        
        title = "Swapping: Responded complaint"
        content = "Your complaint ' "+ current_complaint.subject +"' was responded: '"+ current_complaint.response +"'."
        if str(lang)=='es' :
            title = "Swapping: Reclamacin respondida"
            content = "Tu reclamacion ' "+ current_complaint.subject +"' fue respondida: '"+ current_complaint.response +"'."
            
        send_mail(title, content,"no-reply@swapping.com", [current_complaint.affected_user.email], fail_silently=False)
        
def display_set_display(request):
    if request.POST is None:
        response_data = {}
        response_data['message'] = 'The post is not sent'
        return HttpResponseServerError(json.dumps(response_data), content_type="application/json")
    else:
        print request
        idP = request.POST['id']
        display = request.POST['display']
        type = request.POST['type']
        print "dis-->"+display
        current_service = None
        current_item = None
        print "tipo!!-->" + type
        if str(type) == 's':            
            print "vas a recuperar el servicio"
            current_service = Service.objects.get(id=idP);
            print "recuperaste servicio"
            print current_service.active
            print display
            if display=='False':
                print "desactivamos"
                current_service.active = False
            else:
                print "activamos"
                current_service.active = True
            current_service.save()
            response_data = dict()
            response_data['type'] = "service"
            print "id producto"+str(idP)
            response_data['id'] = idP
            
            try:
                print "intentamos hours"
                Hour.objects.get(id = idP)
                print "entras en horas!"
                response_data['subtype'] = "hour"
            except:
                
                try:
                    print "intentamos estate"
                    Estate.objects.get(id = idP)
                    print "entras en estate!"
                    response_data['subtype'] = "estate"
                except:
                    print "intentaremos car"
                    print "la id es "+idP
                    Car.objects.get(id = idP)
                    response_data['subtype'] = "car"
            
            print response_data
            return HttpResponse(dumps(response_data), content_type="application/json")

        else:
            print "item"+str(idP)
            
            current_item = Item.objects.get(id=idP);
            
            if display=='False':
                current_item.active = False
                current_item.save()
            else:
                current_item.active = True
                current_item.save()
            
            response_data = dict()
            response_data['type'] = "item"
            response_data['id'] = idP
            
            print "hola"
            print "retraso"
            return HttpResponse(dumps(response_data), content_type="application/json")
        
def product_renew(request):
    if request.POST is None:
        response_data = {}
        response_data['message'] = 'The post is not sent'
        return HttpResponseServerError(json.dumps(response_data), content_type="application/json")
    else:
        aut_user = UserApp.objects.get(username=request.user)
            
        aut_user.save()    
        idP = request.POST['id']   
        type = request.POST['type']
        current_service = None
        current_item = None   
        if str(type) == 's':
            print "entra en services!!!"
            current_service = Service.objects.get(id=idP);
            current_service.active = True
            current_service.active_on = datetime.datetime.now()
            current_service.save()
            response_data = dict()
            response_data['type'] = "service"
            response_data['id'] = idP
            try:
                Hour.objects.get(id = idP)
                response_data['subtype'] = "hour"
            except:
                    try:
                        Estate.objects.get(id = idP)
                        response_data['subtype'] = "estate"
                    except:
                        try:
                            Car.objects.get(id = idP)
                            response_data['subtype'] = "car"
                        except:
                            response_data['subtype'] = "none"
            print response_data
            return HttpResponse(dumps(response_data), content_type="application/json")

        else:
            print 'entry item!!!'
            current_item = Item.objects.get(id=idP);
            current_item.active_on = datetime.datetime.now()
            current_item.save()
            response_data = dict()
            response_data['type'] = "item"
            print idP
            response_data['id'] = idP
            return HttpResponse(dumps(response_data), content_type="application/json")
            
        
class Swap_With_MoneyFilter(django_filters.FilterSet):
    #latitude = django_filters.FloatField(lookup_type='contains')

    class Meta:
        model = Swap_With_Money
        fields = ['date']
        fields = ['total']
        fields = ['user']      
        
class Swap_With_MoneyList(generics.ListCreateAPIView):

        #Clase creada para la serializacion de listas a JSON para la clase Service
    model = Swap_With_Money
    serializer_class = Swap_With_MoneySerializer
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('date','total', 'user')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = Swap_With_MoneyFilter
    
    paginate_by = 10
    paginate_by_param = 'page_size'
    max_paginate_by = 100
    

class Swap_With_MoneyDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Swap_With_Money
    serializer_class = Swap_With_MoneySerializer
    #permission_classes = (permissions.IsAuthenticated)
    

        

@csrf_protect
def remove_items_in_session(request):
    request.session['carrito'] = []
    return HttpResponse(dumps({}), content_type="application/json")


def get_service_first_image(request):
    id_service = request.GET['id_service']
    image_service = ServiceImage.objects.filter(service=id_service)
    if len(image_service) > 0:
        print image_service[0].image.url
        return HttpResponse(json.dumps({'url':image_service[0].image.url}),content_type="application/json")
    return HttpResponse(json.dumps({}),content_type="application/json")
    
    class Meta:
        model = Complaint
        fields = ['subject', 'affected_user', 'responsible_user',  'swap', 'description', 'response','resolved']


class CarDetailEdit(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Car
    serializer_class = CarSerializerEdit
    #permission_classes = (permissions.IsAuthenticated) 
    
    
class HourDetailEdit(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Hour
    serializer_class = HourSerializerEdit
    #permission_classes = (permissions.IsAuthenticated)
    

class EstateDetailEdit(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Estate
    serializer_class = EstateSerializerEdit
    #permission_classes = (permissions.IsAuthenticated)

import operator

def get_trending_products_tags(request):
    all_tags = Tag.objects.all()
    trending = dict()
    for tag in all_tags:
        trending[tag.name] = len(Item.objects.filter(tags__name__in=[tag.name])) + len(Service.objects.filter(tags__name__in=[tag.name]))
        
    
    sorted_x = sorted(trending.iteritems(), key=operator.itemgetter(1),reverse=True)
    return HttpResponse(json.dumps({"trends" : sorted_x[:10]}),content_type="application/json")


def get_complaints(request):
    try:
        complaints = Complaint.objects.all();
        print complaints
    except:
        complaints = None
    if complaints is not None:
            data = serializers.serialize('json', complaints)
            print data
            return HttpResponse(data, content_type="application/json")
    else:
        return HttpResponse(json.dumps({}), content_type="application/json")



def get_products(request):
    page = request.GET['page']
    today = date.today()
    today_string = '' + str(today.year) + '-' + str(today.month) + '-' + str(today.day)
    objectQuerySet = Service.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
    objectQuerySet2 = Item.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
    
    result_list = list(chain(objectQuerySet, objectQuerySet2))
    print result_list
    print len(result_list)
    total = len(result_list)
    inicio = (int(page) - 1) * 9
    fin = inicio + 9

    result_list = result_list[int(inicio):int(fin)]
    
    
    sorted(result_list, key=lambda product: product.active_on)

    products = []
    
    for product in result_list:
        product_dict = {}
        product_dict['title'] = product.title
        product_dict['id'] = product.id
        product_dict['description'] = product.description
        if len(Service.objects.filter(pk=product.id)) == 1:
            product_dict['type'] = 'Service'
            if len(Hour.objects.filter(pk=product.id)) == 1:
                product_dict['typeService'] = 'Hour'
            if len(Car.objects.filter(pk=product.id)) == 1:
                product_dict['typeService'] = 'Car'
            if len(Estate.objects.filter(pk=product.id)) == 1:
                product_dict['typeService'] = 'Estate'
            image_service = ServiceImage.objects.filter(service=product.id)
            if len(image_service) > 0:
                product_dict['image'] = image_service[0].image.url
            else:
                product_dict['image'] = '/static/images/default.jpg'
        else:
            product_dict['type'] = 'Item'
            image_service = ItemImage.objects.filter(product=product.id)
            if len(image_service) > 0:
                product_dict['image'] = image_service[0].image.url
            else:
                product_dict['image'] = '/static/images/default.jpg'
        product_dict['user'] = str(product.user.id)+ ":" + product.user.username
        products.append(product_dict)
        

    
   
    return HttpResponse(json.dumps({"products":products,"count":total,"page":page}), content_type="application/json")
    

class ComplaintFilter(django_filters.FilterSet):

    subject = django_filters.CharFilter()
    class Meta:
        model = Complaint
        fields = ['subject', 'affected_user', 'responsible_user',  'swap', 'description', 'response','resolved']

class ComplaintList(generics.ListCreateAPIView):
    model = Complaint
    serializer_class = ComplaintSerializer

    filter_fields = ('subject','id')
    filter_class = ComplaintFilter


class ComplaintDetail(generics.RetrieveUpdateDestroyAPIView):
   
    model = Complaint
    serializer_class = ComplaintSerializer


def add_item_shopping_cart(request):
    if request.user.is_authenticated():
        item = Item.objects.get(pk=request.GET['id_product'])
        print item.user
        print request.user
        print request.user == item.user
        if item.user.username != request.user.username and item.active and item.active_on >= datetime.datetime.now().date() :
            carrito = list(request.session['carrito'])
            if item in carrito:
                return HttpResponseNotFound()
            carrito.append(item)
            request.session['carrito'] = carrito
            return HttpResponse()
        else:
            return HttpResponseForbidden()
    else:
        return HttpResponseBadRequest()

def add_service_wish(request):
    uap = UserApp.objects.get(id=request.user.id)
    uap.save()
    service = Service.objects.get(pk=request.POST['id_service'])
    service.save()
    if not uap in service.desired.all() and not uap == service.user:
        service.desired.add(uap)
    else:
        return HttpResponseForbidden()
    return HttpResponse(dumps({"id":service.id}), content_type="application/json")

def add_item_wish(request):
    uap = UserApp.objects.get(id=request.user.id)
    uap.save()
    items = Item.objects.get(pk=request.POST['id_item'])
    items.save()
    if not uap in items.desired.all() and not uap == items.user:
        items.desired.add(uap)
    else:
        return HttpResponseForbidden()
    return HttpResponse(dumps({"id":items.id}), content_type="application/json")

def remove_service_wish(request):
    uap = UserApp.objects.get(id=request.user.id)
    uap.save()
    service = Service.objects.get(pk=request.POST['id_service'])
    service.desired.remove(uap)
    return HttpResponse(dumps({"id":service.id}), content_type="application/json")

def remove_item_wish(request):
    uap = UserApp.objects.get(id=request.user.id)
    items = Item.objects.get(pk=request.POST['id_item'])
    items.desired.remove(uap)
    return HttpResponse(dumps({"id":items.id}), content_type="application/json")
    

def list_product_wish(request):
    user = UserApp.objects.get(id=request.user.id)
    objectQuerySet1 = Car.objects.filter(desired = user.id)
    objectQuerySet2 = Hour.objects.filter(desired = user.id)
    objectQuerySet3 = Estate.objects.filter(desired = user.id)
    objectQuerySet4 = Item.objects.filter(desired = user.id)
  
    products_wish = []
    for service in objectQuerySet1:
        product = {}
        product['title'] = service.title
        product['id'] = service.id
        product['description'] = service.description
        product['category']= service.category
        product['price']=service.price
        product['type'] = 'Car'
        product['user'] = str(service.user.id)+ ":" + service.user.username
        image_service = ServiceImage.objects.filter(service=service.id)
        if len(image_service) > 0:
            product['image'] = image_service[0].image.url
        else:
            product['image'] = '/static/images/default.jpg'
        products_wish.append(product)
        
    for service in objectQuerySet2:
        product = {}
        product['title'] = service.title
        product['id'] = service.id
        product['description'] = service.description
        product['category']= service.category
        product['price']=service.price
        product['type'] = 'Hour'
        product['user'] = str(service.user.id)+ ":" + service.user.username
        image_service = ServiceImage.objects.filter(service=service.id)
        if len(image_service) > 0:
            product['image'] = image_service[0].image.url
        else:
            product['image'] = '/static/images/default.jpg'
        products_wish.append(product)
    
    for service in objectQuerySet3:
        product = {}
        product['title'] = service.title
        product['id'] = service.id
        product['description'] = service.description
        product['category']= service.category
        product['price']=service.price
        product['type'] = 'Estate'
        product['user'] = str(service.user.id)+ ":" + service.user.username
        image_service = ServiceImage.objects.filter(service=service.id)
        if len(image_service) > 0:
            product['image'] = image_service[0].image.url
        else:
            product['image'] = '/static/images/default.jpg'
        products_wish.append(product)        
    for item in objectQuerySet4:
        product = {}
        product['title'] = item.title
        product['id'] = item.id
        product['description'] = item.description
        product['category']= item.category
        product['price']=item.price
        product['type'] = 'Item'
        product['user'] = str(item.user.id)+ ":" + item.user.username
        image_service = ItemImage.objects.filter(product=item.id)
        if len(image_service) > 0:
            product['image'] = image_service[0].image.url
        else:
            product['image'] = '/static/images/default.jpg'
        products_wish.append(product)
    print products_wish    
    return HttpResponse(json.dumps({"products_wish":products_wish}), content_type="application/json")
    
     
def get_swap_with_money_photos(request):
    swap = Swap.objects.get(pk=request.GET['id_swap'])
    items = Item.objects.filter(swaps=swap)
    urls = []
    for item in items:
        photos = ItemImage.objects.filter(pk=item.id)
        for photo in photos:
            urls.append(photo.image.url)
    response_data = {}
    response_data['urls'] = urls
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def get_swap_photos(request):
    swap = Swap.objects.get(pk=request.GET['id_swap'])
    services = Service.objects.filter(swaps=swap)
    urls = []
    for service in services:
        photos = ServiceImage.objects.filter(pk=service.id)
        for photo in photos:
            urls.append(photo.image.url)
    response_data = {}
    response_data['urls'] = urls
    return HttpResponse(json.dumps(response_data), content_type="application/json")


class ServiceFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter()
    title = django_filters.CharFilter()
    price = django_filters.AllValuesFilter()
    swap = django_filters.NumberFilter()
    user = django_filters.NumberFilter()
    class Meta:
        model = Service
        fields = ['id','title', 'price','swap','user']
        
class ServiceList(generics.ListCreateAPIView):  
        #Clase creada para la serializacion de listas a JSON para la clase encuestador
    queryset = Service.objects.all()
    model = Service
    serializer_class = ServiceSerializer
    filter_fields = ('id','title', 'price','swap','user')
    filter_class = ServiceFilter
    #filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('date')

class ServiceDetail(generics.RetrieveUpdateDestroyAPIView):
        #Clase creada para la serializacion a JSON
    model = Service
    serializer_class = ServiceSerializer
    
    
def join_user_to_service_api(request):
    if request.method == 'POST':
        id_service = request.POST['id_service']
        service = Service.objects.get(pk=id_service)
        if request.user.is_authenticated() and request.user.is_active and service.available_places > 0 and request.user != service.user:
            user_signed = UserApp.objects.get(pk=request.user.id)
            if not join_user_to_service(user_signed, service):
                return HttpResponseBadRequest()
            else:
                return HttpResponse(json.dumps({"user":request.user.id}))
        else:
            return HttpResponseNotFound()
    else:
        return HttpResponseForbidden()


def join_user_to_service(user,service):
    existe_ya = False
    for swap_in_service in service.swaps.all():
        if swap_in_service.user == user:
            existe_ya = True
    if not existe_ya:
        swap =  Swap(date=datetime.datetime.now(),comments="",user=user,total=0)
        swap.save()
        service.swaps.add(swap)
        service.available_places = service.available_places - 1
        service.save()
        return True
    else:
        return False
    
    
def join_user_to_service_credits_api(request):
    id_service = request.POST['id_service']
    service = Service.objects.get(pk=id_service)
    print 'aqui llega'
    if request.user.is_authenticated() and request.user.is_active and service.available_places > 0 and request.user != service.user:
        user_signed = UserApp.objects.get(pk=request.user.id)
        print 'user bueno'
        print user_signed.credits
        if user_signed.credits > 0 and user_signed.credits > (service.price/0.2):
            print 'tiene money'
            if not join_user_to_service(user_signed, service):
                print 'creado swap y ha petao'
                return HttpResponseBadRequest()
            else:
                #Si un credito vale 0.2...
                if not substract_credits_to_user((service.price/0.2), user_signed):
                    print 'quitao money'
                    return HttpResponseForbidden()
        else:
            return HttpResponseGone()
            
    else:
        return HttpResponseNotFound()
    return HttpResponse(json.dumps({"user":request.user.id}))


def substract_credits_to_user(credits_number,user):
    if user.credits > credits_number:
        user.credits = user.credits - (credits_number)
        user.save()
        return True
    else:
        return False
    
    
    
class SwapFilter(django_filters.FilterSet):
    #latitude = django_filters.FloatField(lookup_type='contains')

    class Meta:
        model = Swap
        fields = ['date']
        fields = ['total']
        fields = ['user']      
        
class SwapList(generics.ListCreateAPIView):

        #Clase creada para la serializacion de listas a JSON para la clase Service
    model = Swap
    serializer_class = SwapSerializer
    #permission_classes = (permissions.IsAuthenticated)

    filter_fields = ('date','total', 'user')
    #    filter_backend = (filters.OrderingFilter)
    #    ordering = ('first_name','last_name',)
    filter_class = SwapFilter
    
    paginate_by = 10
    paginate_by_param = 'page_size'
    max_paginate_by = 100
    

class SwapDetail(generics.RetrieveUpdateDestroyAPIView):
   
        #Clase creada para la serializacion a JSON de la clase Service
   
    model = Swap
    serializer_class = SwapSerializer
    #permission_classes = (permissions.IsAuthenticated)
    
    

def get_user_logged(request):
    try:
        print request.user.id
        user_logged = User.objects.get(pk=request.user.id)
        return HttpResponse(serializers.serialize('json', [ user_logged, ]),mimetype='application/json')
    except ObjectDoesNotExist:
        return HttpResponseForbidden()
    
    
    
def get_items(request):
    page = request.GET['page']
    today = date.today()
    today_string = '' + str(today.year) + '-' + str(today.month) + '-' + str(today.day)
    objectQuerySet2 = Item.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
    
    result_list = list(chain(objectQuerySet2))
    total = len(result_list)
    inicio = (int(page) - 1) * 9
    fin = inicio + 9

    result_list = result_list[int(inicio):int(fin)]
    
    
    sorted(result_list, key=lambda product: product.active_on)

    products = []
    
    for product in result_list:
        product_dict = {}
        product_dict['title'] = product.title
        product_dict['id'] = product.id
        product_dict['description'] = product.description
        product_dict['type'] = 'Item'
        image_service = ItemImage.objects.filter(product=product.id)
        if len(image_service) > 0:
            product_dict['image'] = image_service[0].image.url
        else:
            product_dict['image'] = '/static/images/default.jpg'
        product_dict['user'] = str(product.user.id)+ ":" + product.user.username
        products.append(product_dict)
        

    
   
    return HttpResponse(json.dumps({"products":products,"count":total,"page":page}), content_type="application/json")


def get_services(request):
    page = request.GET['page']
    today = date.today()
    today_string = '' + str(today.year) + '-' + str(today.month) + '-' + str(today.day)
    objectQuerySet = Service.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
    
    result_list = list(chain(objectQuerySet))
    total = len(result_list)
    inicio = (int(page) - 1) * 9
    fin = inicio + 9

    result_list = result_list[int(inicio):int(fin)]
    
    
    sorted(result_list, key=lambda product: product.active_on)

    products = []
    
    for product in result_list:
        product_dict = {}
        product_dict['title'] = product.title
        product_dict['id'] = product.id
        product_dict['description'] = product.description
        product_dict['type'] = 'Service'
        if len(Hour.objects.filter(pk=product.id)) == 1:
            product_dict['typeService'] = 'Hour'
        if len(Car.objects.filter(pk=product.id)) == 1:
            product_dict['typeService'] = 'Car'
        if len(Estate.objects.filter(pk=product.id)) == 1:
            product_dict['typeService'] = 'Estate'
        image_service = ServiceImage.objects.filter(service=product.id)
        if len(image_service) > 0:
            product_dict['image'] = image_service[0].image.url
        else:
            product_dict['image'] = '/static/images/default.jpg'
        product_dict['user'] = str(product.user.id)+ ":" + product.user.username
        products.append(product_dict)
        

    
   
    return HttpResponse(json.dumps({"products":products,"count":total,"page":page}), content_type="application/json")
        
    

def get_services_near(request):
    objectQuerySet = Service.objects.all()
    latitude = float(request.POST['latitude'])
    longitude = float(request.POST['longitude'])
    products = []
    for service in objectQuerySet:
        if Haversine(latitude, longitude, service.venue.latitude, service.venue.longitude) < 10  or \
        Haversine(latitude, longitude, service.venue.latitude, service.venue.longitude) < 10:
            print "esta cerca tio"
            product_dict = {}
            product_dict['title'] = service.title
            product_dict['id'] = service.id
            product_dict['description'] = service.description
            product_dict['type'] = 'Service'
            if len(Hour.objects.filter(pk=service.id)) == 1:
                product_dict['typeService'] = 'Hour'
            if len(Car.objects.filter(pk=service.id)) == 1:
                product_dict['typeService'] = 'Car'
                product_dict['moment'] = datetime.datetime.combine(product.moment , product.moment_hour).strftime('%Y-%m-%d %H:%M:%S')
            if len(Estate.objects.filter(pk=service.id)) == 1:
                product_dict['typeService'] = 'Estate'
            image_service = ServiceImage.objects.filter(service=service.id)
            if len(image_service) > 0:
                product_dict['image'] = image_service[0].image.url
            else:
                product_dict['image'] = '/static/images/default.jpg'
            product_dict['user'] = str(service.user.id)+ ":" + service.user.username
            product_dict['latitude'] = service.venue.latitude
            product_dict['longitude'] = service.venue.longitude
            products.append(product_dict)
    print products
    return HttpResponse(json.dumps({"products":products}), content_type="application/json")
            
        
    

from math import *  
    
# Convert Degress to Radians
def Deg2Rad( deg ):
   return deg * math.pi / 180


# Get Distance between two lat/lng points using the Haversine function
# First published by Roger Sinnott in Sky and Telescope magazine in 1984 (Virtues of the Haversine)
#
def Haversine(lat1,lon1,lat2,lon2):
    print lat1
    print lon1
    print lat2
    print lon2
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 

    # 6367 km is the radius of the Earth
    km = 6367 * c
    print km
    return km 


from django.db import IntegrityError

@csrf_protect
def edit_user(request):
    if request.method == "POST":
        user_id = int(request.POST['pk'])
        user = UserApp.objects.get(id=user_id)
        atributte = request.POST['name']
        value = request.POST['value']
        if atributte == 'phone':
            user.phone = value
            user.save()
        if atributte == 'first_name':
            user.first_name = value
            user.save()
        if atributte == 'last_name':
            user.last_name = value
            user.save()
        if atributte == 'email':
            try:
                user.email = value
                user.save()
            except IntegrityError as e:
                return HttpResponseForbidden("Email already registered")
        return HttpResponse()
    return HttpResponseNotFound()

        

def get_services_filtered(request):
    filter = request.POST['filter_type']
    value = request.POST['value']
    today = date.today()
    today_string = '' + str(today.year) + '-' + str(today.month) + '-' + str(today.day)
    if filter == 'service_type':
        if value == 'transports':
            print 'coches'
            objectQuerySet = Car.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
        if value == 'estates':
            print 'casas'
            objectQuerySet = Estate.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
        if value == 'hours':
            print 'horas'
            objectQuerySet = Hour.objects.all().filter(premium=False,active=True,active_on__gte=today_string).order_by('active_on')
    
    
    
    result_list = list(chain(objectQuerySet))
    total = len(result_list)
    inicio = 0
    fin = 9

    result_list = result_list[int(inicio):int(fin)]
    
    
    sorted(result_list, key=lambda product: product.active_on)

    products = []
    
    for product in result_list:
        product_dict = {}
        product_dict['title'] = product.title
        product_dict['id'] = product.id
        product_dict['description'] = product.description
        product_dict['type'] = 'Service'
        if len(Hour.objects.filter(pk=product.id)) == 1:
            product_dict['typeService'] = 'Hour'
        if len(Car.objects.filter(pk=product.id)) == 1:
            product_dict['typeService'] = 'Car'
            product_dict['moment'] = json.dumps(datetime.datetime.combine(product.moment , product.moment_hour).strftime('%Y-%m-%d %H:%M:%S'))
        if len(Estate.objects.filter(pk=product.id)) == 1:
            product_dict['typeService'] = 'Estate'
        image_service = ServiceImage.objects.filter(service=product.id)
        if len(image_service) > 0:
            product_dict['image'] = image_service[0].image.url
        else:
            product_dict['image'] = '/static/images/default.jpg'
        product_dict['user'] = str(product.user.id)+ ":" + product.user.username
        products.append(product_dict)
        

    
   
    return HttpResponse(json.dumps({"products":products,"count":total,"page":1}), content_type="application/json")