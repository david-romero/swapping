from django.db import models
from SwappingApp.models import *
from django import forms
from django.forms import ModelForm
from django.core import validators
import re
import datetime

class AdminForm(ModelForm):
    username = models.CharField(('username'), max_length=8, unique=True,
        validators=[
            validators.RegexValidator(re.compile('^[\w.@+-]+$'), ('Enter a valid username.'), 'invalid')
        ])
    password = models.CharField(('password'), max_length=30)
    first_name = models.CharField(('first name'), max_length=30, blank=False)
    last_name = models.CharField(('last name'), max_length=30, blank=False)
    email = models.EmailField(('email address'), blank=False)
    
    class Meta:
        model = Administrator
        exclude = ['last_login','date_joined'] 
    
class UserForm(ModelForm):
    username = models.CharField(('username'), max_length=30, unique=True,
        validators=[
            validators.RegexValidator(re.compile('^[\w.@+-]+$'), ('Enter a valid username.'), 'invalid')
        ])
    password = models.CharField(('password'), max_length=30)
    name = models.CharField(('first name'), max_length=30, blank=False)
    surname = models.CharField(('last name'), max_length=30, blank=False)
    email = models.EmailField(('email address'), blank=False)
    
    class Meta:
        model = UserApp

        exclude = ['last_login','date_joined','credits','karmaPoints', 'photo', 'products',
                   'karma_1points', 'karma_2points', 'karma_3points', 'karma_4points', 'karma_5points',
                   'karma_users', 'karma_rate','lang'] 

class ItemForm(ModelForm):
    title = models.CharField(('title'), max_length=50,blank=False, null=False)
    description = models.CharField(('description'),max_length=250,blank=False, null=False)
    #image = models.ImageField(('photo'),upload_to = 'photos/')
    enable_swapping = models.BooleanField(('enable_swapping'),null=False)
    premium = models.BooleanField(('premiun'),null=False)
    price = models.FloatField(('price'),null=False)
    category = models.CharField(('category'), max_length=40,choices=CATEGORY)
    quantity = models.IntegerField(('quantity'),null=False,default=1)
    #active = models.BooleanField(('active'), null=False,default=True)
    class Meta:
        model = Item
        exclude = ['created_on','user','swaps','image','active_on','desired','wishSwap','active',]
         

         
class MessageForm(ModelForm):
    subject = models.CharField(('subject'),max_length=200,blank=False)
    content  = models.CharField(('content'),max_length=500)

    class Meta:
        model = Message
        exclude = ['moment','destination_user','origen_user']  

class CommentForm(ModelForm):
    content  = models.CharField(('content'),max_length=500)

    class Meta:
        model = Comment
        exclude = ['moment','target_user','user_origin']   
            
class NewsForm(ModelForm):
    title = models.CharField(('title'), max_length=200)
    description = models.CharField(('description'), max_length=500)

    class Meta:
        model = News
        exclude = ['managers',]
        

CATEGORY = [
            ('MOTOR','MOTOR'),
            ('ESTATES','ESTATES'),
            ('OCCUPATION','OCCUPATION'),
            ('BOOK','BOOK'),
            ('NOTES','NOTES'),
            ('SERVICES','SERVICES'),
            ('BUSINESS','BUSINESS'),
            ('COMPUTING','COMPUTING'),
            ('IMAGE','IMAGE'),
            ('SOUND','SOUND'),
            ('TELEPHONY','TELEPHONY'),
            ('GAMES','GAMES'),
            ('HOUSE','HOUSE'),
            ('GARDEN','GARDEN'),
            ('CLOTHING','CLOTHING'),
            ('HOBBIES','HOBBIES'),
            ('LEISURE','LEISURE'),
            ('SPORTS','SPORTS'),
            ('PETS','PETS'),
            ('FARMING','FARMING')
            ]
class CarForm(ModelForm):
    CONVERSATION = [('LOW_LEVEL','LOW LEVEL'),('MEDIUM_LEVEL' , 'MEDIUM LEVEL'),('HIGH_LEVEL' , 'HIGH LEVEL')]
    title = models.CharField(('title'), max_length=50,blank=False, null=False)
    description = models.CharField(('description'),max_length=250,blank=False, null=False)
    enable_swapping = models.BooleanField(('enable swapping'),null=False)
    premium = models.BooleanField(('premium'),null=False)
    price = models.FloatField(('price'),null=False)
    category = models.CharField(('category'), max_length=40,choices=CATEGORY)
    available_places = models.IntegerField(('available places'))
    pets = models.BooleanField(('pets'),null=False)
    baggage = models.BooleanField(('baggage'),null=False)
    smoker = models.BooleanField(('smoker'),null=False)
    conversation = models.CharField(('conversation'),max_length=30,choices=CONVERSATION)
    moment = models.DateField(('moment'),null=False,name=None,auto_now=False, auto_now_add=False)
    moment_hour = models.TimeField(('moment_hour'),null=False,name=None,auto_now=False, auto_now_add=False)
    
    def clean_moment(self):
        moment = self.cleaned_data['moment']
        if moment < datetime.date.today():
            raise forms.ValidationError("The moment cannot be in the past!")
        return moment
    
    class Meta:
        model = Car
        exclude = ['created_on','user','swaps','venue','destination','image','active_on','desired','wishSwap','active',]
        
class HourForm(ModelForm):
    title = models.CharField(('title'), max_length=50,blank=False, null=False)
    description = models.CharField(('description'),max_length=250,blank=False, null=False)
    enable_swapping = models.BooleanField(('enable swapping'),null=False)
    premium = models.BooleanField(('premium'),null=False)
    price = models.FloatField(('price'),null=False)
    category = models.CharField(('category'), max_length=40,choices=CATEGORY)
    available_places = models.IntegerField(('available places'))
    day_of_week = models.IntegerField(('day of week'),null=False)
    duration = models.IntegerField(('duration'),null=False)
    class Meta:
        model = Hour
        exclude = ['created_on','user','swaps','venue','image','active_on','desired','wishSwap','active',]
        
class EstateForm(ModelForm):
    title = models.CharField(('title'), max_length=50,blank=False, null=False)
    description = models.CharField(('description'),max_length=250,blank=False, null=False)
    enable_swapping = models.BooleanField(('enable swapping'),null=False)
    premium = models.BooleanField(('premium'),null=False)
    price = models.FloatField(('price'),null=False)
    category = models.CharField(('category'), max_length=40,choices=CATEGORY)
    available_places = models.IntegerField(('available places'))
    beginning = models.DateField(('beginning'), name=None, auto_now=False, auto_now_add=False)
    ending = models.DateField(('ending'), name=None, auto_now=False, auto_now_add=False)
    
    class Meta:
        model = Estate
        exclude = ['created_on','user','swaps','venue','image','active_on','desired','wishSwap','active',]
        
class ComplaintForm(ModelForm):
    subject = models.CharField(('subject'), max_length=50, blank=False, null=False)
    description = models.CharField(max_length = 500, blank = False)
    
    class Meta:
        model = Complaint
        exclude = ['affected_user','responsible_user','swap','response','resolved']
