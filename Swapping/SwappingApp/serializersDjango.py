from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField, RelatedField
from SwappingApp.models import *


"""
    Serializers para poder parsear a JSON



class EncuestadorSerializer (serializers.ModelSerializer):
    class Meta:
        model = Encuestador
        #fields = ('owner','username', 'first_name', 'last_name', 'email') TODOS
        exclude = ('password',)


class IdiomaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Idioma


class CuestionarioSerializer (serializers.ModelSerializer):
    class Meta:
        model = Cuestionario

     
class EncuestaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Encuesta
"""
class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = UserApp
        exclude = ('password','photo')
        
        
class AdministratorSerializer (serializers.ModelSerializer):
    class Meta:
        model = Administrator
        #fields = ('owner','username', 'first_name', 'last_name', 'email') TODOS
        exclude = ('password',)
        

class NewsSerializer (serializers.ModelSerializer):
    class Meta:
        model = News
        

class ItemSerializer (serializers.ModelSerializer):
    class Meta:
        model = Item

class ServiceSerializer (serializers.ModelSerializer):
    class Meta:
        model = Service

class ItemSerializer2 (serializers.ModelSerializer):
    class Meta:
        model = Item
        exclude = ('created_on','swap','active_on','wishSwap','user')
        
        
class ProductSerializer (serializers.ModelSerializer):
    class Meta:
        model = Product
        
class ServiceSerializer (serializers.ModelSerializer):
    class Meta:
        model = Service
        
class HourSerializer (serializers.ModelSerializer):
    class Meta:
        model = Hour
        depth = 1
        
class HourSerializerEdit (serializers.ModelSerializer):
    class Meta:
        model = Hour
        exclude = ('created_on','active_on','user','swap','venue')
                
class CarSerializer (serializers.ModelSerializer):
    class Meta:
        model = Car
        depth = 1
        
class CarSerializerEdit (serializers.ModelSerializer):
    class Meta:
        model = Car
        exclude = ('created_on','user','active_on','swap','image','venue','destination')
        
class EstateSerializerEdit (serializers.ModelSerializer):
    class Meta:
        model = Estate
        exclude = ('created_on','user','active_on','swap','image','venue')
        
class EstateSerializer (serializers.ModelSerializer):
    class Meta:
        model = Estate
        depth = 1

class LocationSerializer (serializers.ModelSerializer):
    class Meta:
        model = Location
        
class MessageSerializer (serializers.ModelSerializer):
    class Meta:
        model = Message
        depth = 1
        
class CommentSerializer (serializers.ModelSerializer):
    class Meta:
        model = Comment
        depth = 1 
              
class Swap_With_MoneySerializer (serializers.ModelSerializer):
    class Meta:
        model = Swap_With_Money
        depth = 1
 
        
class SwapSerializer (serializers.ModelSerializer):
    class Meta:
        model = Swap
        depth = 1


class ComplaintSerializer (serializers.ModelSerializer):
    class Meta:
        model = Complaint
