from django.db import models
from django.conf import settings
from django.contrib import admin
from django.contrib.auth.models import User
from django.db import models
from django.db.models.fields import BLANK_CHOICE_DASH
from django.utils.translation import ugettext_lazy as _
from taggit.managers import TaggableManager
from taggit.models import TagBase
from taggit.models import GenericTaggedItemBase

# Create your models here.

from django.contrib.auth.models import User
User._meta.get_field('email')._unique = True


"""---------------------------------------------------------------------------------
class Encuestador (User):

        Clase encuestador, se define un dominio y si se encuentra eliminado o no.
        El dominio debe ser unico
    
    t_dominio = models.CharField(max_length=50, blank=True, null=False, verbose_name=_(u"Dominio"))
    l_eliminado = models.BooleanField(default=False, verbose_name=_(u"Eliminado"))
    
    class Meta:
        ordering = ["first_name", "last_name"]
        verbose_name = _("Encuestador")
        verbose_name_plural = _("Encuestadores")
        
    def __unicode__(self):
        return self.username
   
    class Admin:
        pass

        def __init__(self):
            print(self)

--------------------------------------------------------------------------------"""

class ValidationCode(models.Model):
    code = models.CharField(max_length=15)
    usuario = models.IntegerField(null=False)

class Person (User):
    phone = models.CharField(max_length=15, blank=False, null=False, verbose_name=_(u"Phone"))
    class Meta:
        abstract = True
    

class Administrator(Person):
    
    class Meta:
        verbose_name = _("Administrator")
        verbose_name_plural = _("Administrators")
        
    def __unicode__(self):
        return self.username
   
    class Admin:
        pass

        def __init__(self):
            print(self)
        
    
    


            
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



import os

def get_image_path(instance, filename):
    return os.path.join(str(instance.id), filename)


class UserAppManager(models.Manager):
    def get_by_natural_key(self,username):
        return self.get(username=username)  


class UserApp (Person):
    objects = UserAppManager()
    
    authenticated = models.BooleanField(null=False,verbose_name=_(u"Authenticated"))
    active = models.BooleanField(null=False,verbose_name=_(u"Active"))
    photo = models.ImageField( verbose_name=_(u"photo"),upload_to = get_image_path, default = 'uploaded/photos/None/no-img.jpg', null=True)
    credits = models.IntegerField(null=False,default=0,verbose_name=_(u"Credits"))
    #No hace falta
    #products = models.ManyToOneRel(Product,through='Product',null=True )
    #Vamos a aniadir una relacion para controlar los votos
    karmaPoints = models.IntegerField(null=False,default=0,verbose_name=_(u"Karma"))
    karma_1points = models.IntegerField(null=False,default=0,verbose_name=_(u"Karma1"))
    karma_2points = models.IntegerField(null=False,default=0,verbose_name=_(u"Karma2"))
    karma_3points= models.IntegerField(null=False,default=0,verbose_name=_(u"Karma3"))
    karma_4points= models.IntegerField(null=False,default=0,verbose_name=_(u"Karma4"))
    karma_5points= models.IntegerField(null=False,default=0,verbose_name=_(u"Karma5"))
    #Number of users who'd given karma points
    karma_users = models.IntegerField(null=False,default=0,verbose_name=_(u"Karma_users"))
    # (arithmetic rounded media of all the points, 1 2 3 4 or 5). We've decided to make it persistent becouse of efficiency reasons..
    karma_rate  = models.IntegerField(null=False,default=0,verbose_name=_(u"Karma"))
    
    def natural_key(self):
        return (self.first_name, self.last_name) 
    
    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        
    def __unicode__(self):
        return self.username
   
    class Admin:
        pass

        def __init__(self):
            print(self)


class Vote(models.Model):
    voter = models.ForeignKey(UserApp, null=False,related_name="Voter")
    voted = models.ForeignKey(UserApp, null=False,related_name="Voted")
    date = models.DateField(null=False,blank=False)
    
    class Meta:
        unique_together = ('voter', 'voted',)


class Swap(models.Model):
    date = models.DateField(verbose_name=_(u"Date"), name=None, auto_now=False, auto_now_add=False)
    comments = models.CharField(max_length=250, blank=False, null=False, verbose_name=_(u"Comments"))
    total = models.FloatField( null=False, verbose_name=_(u"Total"))
    user = models.ForeignKey(UserApp, null=False)
    
    class Meta:
        #abstract = True No permite relacion con clase abstracta
        ordering = ["total", "date","user"]
        verbose_name = _("Swap")
        verbose_name_plural = _("Swappings")
        
    def __unicode__(self):
        return self.user
    
    
class Product (models.Model):
    title = models.CharField( max_length=50,blank=False, null=False, verbose_name=_(u"Name"))
    created_on = models.DateField(verbose_name=_(u"Date of creation "), name=None, auto_now=False, auto_now_add=False)
    active_on = models.DateField(verbose_name=_(u"Active Date"),auto_now=False, auto_now_add=False,null=False)
    active = models.BooleanField(null=False,verbose_name=_(u"Active"),default=True)
    description = models.CharField(max_length=250,blank=False, null=False, verbose_name=_(u"Description"))
    enable_swapping = models.BooleanField(null=False,verbose_name=_(u"Enable Swapping"))
    price = models.FloatField(null=False, verbose_name=_(u"Price"))
    category = models.CharField(max_length=40,choices=CATEGORY,verbose_name=_(u"Category") )
    premium = models.BooleanField(null=False,verbose_name=_(u"Premiun") )
    wishSwap = models.CharField( max_length=250,blank=False,null=True,verbose_name=_(u'Wish Swap'))
    user = models.ForeignKey(UserApp, null=True,related_name="%(class)s_Owner")
    desired = models.ManyToManyField(UserApp,related_name="%(class)s_Desired")
    swaps = models.ManyToManyField(Swap,null=True, related_name=_(u"%(class)s_Swappers"))
    class Meta:
        abstract = True
        ordering = ["title", "created_on"]
        verbose_name = _("Product")
        verbose_name_plural = _("Products")
        
    def __unicode__(self):
        return self.title
    

   
   
class Location (models.Model):
    latitude = models.FloatField(null=False, verbose_name=_(u"Latitude"))
    longitude = models.FloatField(null=False, verbose_name=_(u"Longitude"))
    class Meta:
        ordering = ["latitude", "longitude"]

class Service(Product):
    available_places = models.IntegerField(verbose_name=_(u"Available Places"))
    venue = models.ForeignKey(Location, null=False, related_name="Venue")
    
    #Django taggit
    tags = TaggableManager(blank=True)
    
    class Meta:
        ordering = ["available_places", "venue"]
    

CONVERSATION = [('LOW_LEVEL','LOW LEVEL'),('MEDIUM_LEVEL' , 'MEDIUM LEVEL'),('HIGH_LEVEL' , 'HIGH LEVEL')]

class Car(Service):
    pets = models.BooleanField(null=False,verbose_name=_(u"Pets"))
    baggage = models.BooleanField(null=False,verbose_name=_(u"Baggage"))
    smoker = models.BooleanField(null=False,verbose_name=_(u"Smoker"))
    moment = models.DateField(null=False,verbose_name=_(u"Moment"))
    moment_hour = models.TimeField(null=False,verbose_name=_(u"Moment_Hour"))
    conversation = models.CharField(max_length=30,choices=CONVERSATION,verbose_name=_(u"Conversation") )
    destination = models.ForeignKey(Location,null=False, related_name="Destination")

    class Meta:
        ordering = ["moment","pets", "baggage","smoker","conversation","destination"]


class Hour(Service):
    day_of_week = models.IntegerField(null=False,default=1,verbose_name=_(u"Day of Week"))
    duration = models.IntegerField(null=False,default=1,verbose_name=_(u"Duration"))
    class Meta:
        ordering = ["day_of_week", "duration"]
    
class Estate(Service):
    beginning = models.DateField(verbose_name=_(u"Beginning"), name=None, auto_now=False, auto_now_add=False)
    ending = models.DateField(verbose_name=_(u"Ending"), name=None, auto_now=False, auto_now_add=False)
    class Meta:
        ordering = ["beginning", "ending"]


class Item(Product):
    quantity = models.IntegerField(null=False,default=1,verbose_name=_(u"Quantity"))
    
    #Django taggit
    tags = TaggableManager(blank=True)
    
    class Meta:
        ordering = ["quantity"]


class Address(models.Model):
    street = models.CharField(max_length=200,blank=False,  verbose_name=_(u"Street"))
    number = models.IntegerField(verbose_name=_(u"Number"))
    zip_code = models.IntegerField(verbose_name=_(u"Zip Code"))
    city = models.CharField(max_length=200,blank=False,  verbose_name=_(u"City"))
    street_type  = models.CharField(max_length=20,blank=False,  verbose_name=_(u"Street Type"))
    others = models.CharField(max_length=200,blank=False,  verbose_name=_(u"Others"))
 
    
class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)
    
    
class Tax(models.Model):
    percentage = IntegerRangeField(min_value=1, max_value=50)
    limit = models.FloatField(null=False,verbose_name=_(u"Limit"))


class Payment(models.Model):
    managed_by_us = models.BooleanField(null=False,verbose_name=_(u"Managed By Us"))
    profit = models.FloatField(null=False,verbose_name=_(u"Profit"))
    tax = models.ForeignKey(Tax,null=True,related_name="Tax")


class Swap_With_Money(Swap):
    shipping_company = models.CharField(max_length=50,blank=False, null=False, verbose_name=_(u"Shipping Company"))
    uuid = models.CharField(max_length=20,unique= True, verbose_name=_(u"UUID"))
    shipping_cost = models.FloatField( null=False, verbose_name=_(u"Shipping Cost"))
    pick_up_location = models.ForeignKey(Address,null=False, related_name="Pick Up Location")
    destination = models.ForeignKey(Address,null=False, related_name="Destination")
    payment = models.ForeignKey(Payment,null=False,related_name="Payment") 
    #payment = models.OneToOneField(Payment)
    
    """def save(self, *args, **kwargs):
        if self.pick_up_location != self.destination:
            return super(Swap_With_Money, self).save(*args, **kwargs) # Call the "real" save() method.
    """    
        
    def delete(self, *args, **kwargs):
        #This is "Cascade"
        self.payment.delete()
        return super(self.__class__, self).delete(*args, **kwargs)
    
    class Meta:
        verbose_name = _("Swap with money")
        verbose_name_plural = _("Swappings with money")
        ordering = ["payment", "shipping_cost"]
    
class News(models.Model):
    title = models.CharField(max_length=200,blank=False, null=False, verbose_name=_(u"Title"))
    description  = models.CharField(max_length=500,blank=False, null=False, verbose_name=_(u"Description"))
    managers = models.ManyToManyField(Administrator,null=False, related_name=_(u"Administrator"))
    class Meta:
        ordering = ["title", "description"]
    
class Message(models.Model):
    subject = models.CharField(max_length=200,blank=False, null=False, verbose_name=_(u"Subject"))
    content  = models.CharField(max_length=500,blank=False, null=False, verbose_name=_(u"Content"))
    moment = models.DateTimeField(verbose_name=_(u"Moment"), name=None, auto_now=False, auto_now_add=False)
    destination_user = models.ForeignKey(UserApp,null=True, related_name=_(u"User"))
    origen_user = models.ForeignKey(UserApp,null=False, related_name=_(u"User2"))
    class Meta:
        ordering = ["subject", "content","moment","destination_user","origen_user"]
        
        
class Complaint(models.Model):
    subject = models.CharField(max_length = 50, blank = False, null = False)
    affected_user = models.ForeignKey(UserApp, null=False, blank=False, related_name="affected_user")
    responsible_user = models.ForeignKey(UserApp, null=True, blank=True, related_name="responsible_user")
    swap = models.ForeignKey(Swap, null = True, blank = True)
    description = models.CharField(max_length = 500, blank = False, null = False)
    response = models.CharField (max_length = 500, blank = False, null = False)
    resolved = models.BooleanField(default=False, verbose_name=_(u"resolved"))
    

def get_product_image_path(instance, filename):
    return os.path.join('products',str(instance.product.id), filename)


class ItemImage(models.Model):
    image = models.ImageField(verbose_name=_(u"photo"),upload_to = get_product_image_path,null=False,blank = False, default = 'photos/None/no-img.jpg')
    product = models.ForeignKey(Item, null = False, related_name="product_related")
    

def get_service_image_path(instance, filename):
    return os.path.join('service',str(instance.service.id), filename)


class ServiceImage(models.Model):
    image = models.ImageField(verbose_name=_(u"photo"),upload_to = get_service_image_path,null=False,blank = False, default = 'photos/None/no-img.jpg')
    service = models.ForeignKey(Service, null = False, related_name="service_related")
    
    
class Comment(models.Model):
    content  = models.CharField(max_length=500,blank=False, null=False, verbose_name=_(u"Content"))
    moment = models.DateTimeField(verbose_name=_(u"Moment"), name=None, auto_now=False, auto_now_add=False)
    target_user = models.ForeignKey(UserApp,null=False, related_name=_(u"target user"))
    user_origin = models.ForeignKey(UserApp,null=False, related_name=_(u"user origin"))
    class Meta:
        ordering = ["content","moment","target_user","user_origin"]



