"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""
import datetime
from PIL import Image
from django.test import *
from django.contrib.auth.models import User
from models import *


class PersonTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example", email="example@mail.com", password="eXaMpLe123")
        return Person.objects.create(user, phone="955123456")
    
    def setUp2(self):
        user = User.objects.create_user(username="example2", email="example2@mail.com", password="eXaMpLe123")
        return Person.objects.create(user, phone="abc95")
        
    def test_person_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Person))
        self.assertTrue(isinstance(t.phone, int))
    
    def test_person_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Person))
        self.assertTrue(isinstance(t.phone, int))

class AdministratorTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example3", email="example3@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        return Administrator.objects.create(person)
    
    def test_administrator_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Administrator))
        
class SwapTestCase(TestCase):
    def setUp(self):
        return Swap.objects.create(date=datetime.datetime(2014, 03, 15, 16, 30), comments="Very good example", total=39.75)
    
    def setUp2(self):
        return Swap.objects.create(date=datetime.datetime(2012, 03, 15, 16, 30), comments=956, total="Hola")
    
    def test_swap_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Swap))
        self.assertTrue(isinstance(t.date, date))
        dateInit = datetime.datetime(2014, 04, 01, 29, 50)
        self.assertTrue(t.date>dateInit)
        self.assertTrue(isinstance(t.comments, basestring))
        self.assertTrue(isinstance(t.total, float))
        self.assertTrue(t.total>0.0)
        
    def test_swap_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Swap))
        self.assertTrue(isinstance(t.date, date))
        dateInit = datetime.datetime(2014, 04, 01, 29, 50)
        self.assertTrue(t.date>dateInit)
        self.assertTrue(isinstance(t.comments, basestring))
        self.assertTrue(isinstance(t.total, float))
        self.assertTrue(t.total>0.0)
        
class UserAppTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example4", email="example4@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        return UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
    
    def setUp2(self):
        user = User.objects.create_user(username="example5", email="example5@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        return UserApp.objects.create(person, authenticated=True, active=True, photo=12, karmaPoints=-2, credits=-3)
    
    def test_userApp_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, UserApp))
        self.assertTrue(isinstance(t.authenticated, bool))
        self.assertTrue(isinstance(t.active, bool))
        self.assertTrue(isinstance(t.photo, Image))
        self.assertTrue(isinstance(t.karmaPoints, int))
        self.assertTrue(t.karmaPoints>0)
        self.assertTrue(isinstance(t.credits, int))
        self.assertTrue(t.credits>0)
        
    def test_userApp_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, UserApp))
        self.assertTrue(isinstance(t.authenticated, bool))
        self.assertTrue(isinstance(t.active, bool))
        self.assertTrue(isinstance(t.photo, Image))
        self.assertTrue(isinstance(t.karmaPoints, int))
        self.assertTrue(t.karmaPoints>0)
        self.assertTrue(isinstance(t.credits, int))
        self.assertTrue(t.credits>0)

class ProductTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example6", email="example6@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        return Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
    
    def setUp2(self):
        user = User.objects.create_user(username="example7", email="example7@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        return Product.objects.create(title=123, created_on=datetime.datetime(2011, 03, 12, 18, 30), description=12, image=34, enable_swapping="hola", price=False, category="HELLO", premium=12, user=user, swap=True)
    
    def test_product_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Product))
        self.assertTrue(isinstance(t.title, basestring))
        self.assertTrue(isinstance(t.created_on, date))
        dateInit = datetime.datetime(2014, 04, 01, 29, 50)
        self.assertTrue(t.created_on>dateInit)
        self.assertTrue(isinstance(t.description, basestring))
        self.assertTrue(isinstance(t.image, Image))
        self.assertTrue(isinstance(t.enable_swapping, bool))
        self.assertTrue(isinstance(t.price, float))
        self.assertTrue(t.price>0.0)
        self.assertTrue(isinstance(t.category, basestring))
        self.assertTrue(t.category in CATEGORY)
        self.assertTrue(isinstance(t.premium, bool))
        self.assertTrue(isinstance(t.user, UserApp))
        self.assertTrue(isinstance(t.swap, Swap))
        
    def test_product_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Product))
        self.assertTrue(isinstance(t.title, basestring))
        self.assertTrue(isinstance(t.created_on, date))
        dateInit = datetime.datetime(2014, 04, 01, 29, 50)
        self.assertTrue(t.created_on>dateInit)
        self.assertTrue(isinstance(t.description, basestring))
        self.assertTrue(isinstance(t.image, Image))
        self.assertTrue(isinstance(t.enable_swapping, bool))
        self.assertTrue(isinstance(t.price, float))
        self.assertTrue(t.price>0.0)
        self.assertTrue(isinstance(t.category, basestring))
        self.assertTrue(t.category in CATEGORY)
        self.assertTrue(isinstance(t.premium, bool))
        self.assertTrue(isinstance(t.user, UserApp))
        self.assertTrue(isinstance(t.swap, Swap))

class LocationTestCase(TestCase):
    def setUp(self):
        return Location.objects.create(latitude=37.23, longitude=5.59)
    
    def setUp2(self):
        return Location.objects.create(latitude="Hello", longitude="Bye")
    
    def test_location_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Location))
        self.assertTrue(isinstance(t.latitude, float))
        self.assertTrue(isinstance(t.longitude, float))
        
    def test_location_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Location))
        self.assertTrue(isinstance(t.latitude, float))
        self.assertTrue(isinstance(t.longitude, float))
        
class ServiceTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example8", email="example8@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        return Service.objects.create(product, available_places=5, venue=location)
    
    def setUp2(self):
        user = User.objects.create_user(username="example9", email="example9@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        return Service.objects.create(product, available_places="No", venue=True)
    
    def test_service_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Service))
        self.assertTrue(isinstance(t.available_places, int))
        self.assertTrue(t.available_places>0)
        self.assertTrue(isinstance(t.venue, Location))
        
    def test_service_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Service))
        self.assertTrue(isinstance(t.available_places, int))
        self.assertTrue(t.available_places>0)
        self.assertTrue(isinstance(t.venue, Location))

class CarTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example10", email="example10@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        service = Service.objects.create(product, available_places=5, venue=location)
        location2 = Location.objects.create(latitude=37.87, longitude=-6.66)
        return Car.objects.create(service, pets=False, baggage=True, smoker=False, conversation='HIGH_LEVEL', destination=location2)
    
    def setUp2(self):
        user = User.objects.create_user(username="example11", email="example11@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        service = Service.objects.create(product, available_places=5, venue=location)
        location2 = Location.objects.create(latitude=37.87, longitude=-6.66)
        return Car.objects.create(service, pets=12, baggage="Example", smoker="No", conversation="YES", destination=False)
    
    def test_car_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Car))
        self.assertTrue(isinstance(t.pets, bool))
        self.assertTrue(isinstance(t.baggagge, bool))
        self.assertTrue(isinstance(t.smoker, bool))
        self.assertTrue(isinstance(t.conversation, basestring))
        self.assertTrue(t.conversation in CONVERSATION)
        self.assertTrue(isinstance(t.destination, Location))
        self.assertTrue(t.service.location is t.destination)
        
    def test_car_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Car))
        self.assertTrue(isinstance(t.pets, bool))
        self.assertTrue(isinstance(t.baggagge, bool))
        self.assertTrue(isinstance(t.smoker, bool))
        self.assertTrue(isinstance(t.conversation, basestring))
        self.assertTrue(t.conversation in CONVERSATION)
        self.assertTrue(isinstance(t.destination, Location))
        self.assertTrue(t.service.location is t.destination)
              
class HourTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example12", email="example12@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        service = Service.objects.create(product, available_places=5, venue=location)
        return Hour.objects.create(service, day_of_week=24, duration=2)
    
    def setUp2(self):
        user = User.objects.create_user(username="example13", email="example13@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        service = Service.objects.create(product, available_places=5, venue=location)
        return Hour.objects.create(service, day_of_week="Lorem Ipsum", duration=True)
    
    def test_hour_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Hour))
        self.assertTrue(isinstance(t.day_of_week, int))
        self.assertTrue(t.day_of_week>0 and t.day_of_week<32)
        now = datetime.datetime.now()
        if now.month == 2 and now.year%4 != 0:
             self.assertTrue(t.day_of_week<29)
        if now.month == 2 and now.year%4 == 0:
             self.assertTrue(t.day_of_week<30)
        self.assertTrue(isinstance(t.duration, int))
        self.assertTrue(t.duration>0)
        
    def test_hour_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Hour))
        self.assertTrue(isinstance(t.day_of_week, int))
        self.assertTrue(t.day_of_week>0 and t.day_of_week<32)
        now = datetime.datetime.now()
        if now.month == 2 and now.year%4 != 0:
             self.assertTrue(t.day_of_week<29)
        if now.month == 2 and now.year%4 == 0:
             self.assertTrue(t.day_of_week<30)
        self.assertTrue(isinstance(t.duration, int))
        self.assertTrue(t.duration>0)
        
class EstateTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example14", email="example14@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        service = Service.objects.create(product, available_places=5, venue=location)
        return Estate.objects.create(service, beginning=datetime.datetime(2014, 06, 12, 12, 30), ending=datetime.datetime(2014, 06, 20, 12, 30))
    
    def setUp2(self):
        user = User.objects.create_user(username="example15", email="example15@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        location = Location.objects.create(latitude=37.23, longitude=5.59)
        service = Service.objects.create(product, available_places=5, venue=location)
        return Estate.objects.create(service, beginning=datetime.datetime(2012, 06, 12, 12, 30), ending=datetime.datetime(2012, 06, 20, 12, 30))
    
    def test_estate_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Estate))
        self.assertTrue(isinstance(t.beginning, datetime))
        self.assertTrue(isinstance(t.ending, datetime))
        dateInit = datetime.datetime.now()
        self.assertTrue(t.beginning>=dateInit)
        self.assertTrue(t.ending>dateInit and t.ending>t.beginning)
        
    def test_estate_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Estate))
        self.assertTrue(isinstance(t.beginning, datetime))
        self.assertTrue(isinstance(t.ending, datetime))
        dateInit = datetime.datetime.now()
        self.assertTrue(t.beginning>=dateInit)
        self.assertTrue(t.ending>dateInit and t.ending>t.beginning)
        
class ItemTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example16", email="example16@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        return Item.objects.create(product, quantity=3)
    
    def setUp2(self):
        user = User.objects.create_user(username="example17", email="example17@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        product = Product.objects.create(title="Example", created_on=datetime.datetime(2014, 03, 12, 18, 30), description="Very good example", image='photos/None/no-img.jpg', enable_swapping=False, price=39.75, category="TELEPHONY", premium=False, user=userApp, swap=null)
        return Item.objects.create(product, quantity="Bye")
    
    def test_item_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Item))
        self.assertTrue(isinstance(t.quantity, int))
        self.assertTrue(t.quantity>0)
        
    def test_item_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Item))
        self.assertTrue(isinstance(t.quantity, int))
        self.assertTrue(t.quantity>0)
        
class Swap_With_MoneyTestCase(TestCase):
    def setUp(self):
        swap = Swap.objects.create(date=datetime.datetime(2014, 03, 15, 16, 30), comments="Very good example", total=39.75)
        return Swap_With_Money.objects.create(swap, shipping_method="SEUR", shipping_cost=7.95)
    
    def setUp2(self):
        swap = Swap.objects.create(date=datetime.datetime(2014, 03, 15, 16, 30), comments="Very good example", total=39.75)
        return Swap_With_Money.objects.create(swap, shipping_method=12, shipping_cost="Hello")
    
    def test_swap_with_money_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Swap_With_Money))
        self.assertTrue(isinstance(t.shipping_method, basestring))
        self.assertTrue(isinstance(t.shipping_cost, float))
        self.assertTrue(t.shipping_cost>0.0)
        
    def test_swap_with_money_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Swap_With_Money))
        self.assertTrue(isinstance(t.shipping_method, basestring))
        self.assertTrue(isinstance(t.shipping_cost, float))
        self.assertTrue(t.shipping_cost>0.0)
        
class PaymentTestCase(TestCase):
    def setUp(self):
        swap = Swap.objects.create(date=datetime.datetime(2014, 03, 15, 16, 30), comments="Very good example", total=39.75)
        swm = Swap_With_Money.objects.create(swap, shipping_method="SEUR", shipping_cost=7.95)
        return Payment.objects.create(tax=2.0, swap_with_money=swm)
    
    def setUp2(self):
        return Payment.objects.create(tax="Lorem Ipsum", swap_with_money=True)
    
    def test_payment_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Payment))
        self.assertTrue(isinstance(t.tax, float))
        self.assertTrue(t.tax>=0.0)
        self.assertTrue(isinstance(t.swap_with_money, Swap_With_Money))
        
    def test_payment_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Payment))
        self.assertTrue(isinstance(t.tax, float))
        self.assertTrue(t.tax>=0.0)
        self.assertTrue(isinstance(t.swap_with_money, Swap_With_Money))
        
class NewsTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example18", email="example18@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        admin = Administrator.objects.create(person)
        return News.objects.create(title="Example", description="Lorem Ipsum", managers=admin)
    
    def setUp2(self):
        return News.objects.create(title=12, description=34, managers=True)
    
    def test_news_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, News))
        self.assertTrue(isinstance(t.title, basestring))
        self.assertTrue(isinstance(t.description, basestring))
        self.assertTrue(len(t.managers>0))
        if len(t.managers)==1:
            self.assertTrue(isinstance(t.managers[0], Administrator))
        if len(t.managers)>1:
            for i in range(len(t.managers)):
                self.assertTrue(isinstance(t.managers[i], Administrator))
                
    def test_news_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, News))
        self.assertTrue(isinstance(t.title, basestring))
        self.assertTrue(isinstance(t.description, basestring))
        self.assertTrue(len(t.managers>0))
        if len(t.managers)==1:
            self.assertTrue(isinstance(t.managers[0], Administrator))
        if len(t.managers)>1:
            for i in range(len(t.managers)):
                self.assertTrue(isinstance(t.managers[i], Administrator))
        
class MessageTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="example19", email="example19@mail.com", password="eXaMpLe123")
        person = Person.objects.create(user, phone="955123456")
        userApp = UserApp.objects.create(person, authenticated=True, active=True, photo='photos/None/no-img.jpg', karmaPoints=7, credits=32)
        return Message.objects.create(subject="Example", content="Lorem Ipsum", moment=datetime.datetime(2014, 03, 28, 18, 30), destination_user=userApp)
    
    def setUp2(self):
        return Message.objects.create(subject=12, content=34, moment=datetime.datetime(2012, 03, 28, 18, 30), destination_user=False)
    
    def test_message_creation(self):
        t = self.setUp(self)
        self.assertTrue(isinstance(t, Message))
        self.assertTrue(isinstance(t.subject, basestring))
        self.assertTrue(isinstance(t.content, basestring))
        self.assertTrue(isinstance(t.moment, datetime))
        dateInit = datetime.datetime.now()
        self.assertTrue(t.moment>=dateInit)
        self.assertTrue(isinstance(t.destination_user, UserApp))
        
    def test_message_creation2(self):
        t = self.setUp2(self)
        self.assertTrue(isinstance(t, Message))
        self.assertTrue(isinstance(t.subject, basestring))
        self.assertTrue(isinstance(t.content, basestring))
        self.assertTrue(isinstance(t.moment, datetime))
        dateInit = datetime.datetime.now()
        self.assertTrue(t.moment>=dateInit)
        self.assertTrue(isinstance(t.destination_user, UserApp))
