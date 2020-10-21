from SwappingApp.models import *
import SwappingApp.models
from django.http import HttpResponseRedirect
from django.http.response import *
import paypalrestsdk
import json
from paypalrestsdk import Payment
from paypalrestsdk import Capture
from django.core.urlresolvers import reverse
from django.core import serializers
from django.utils.translation import ugettext_lazy as _
import datetime
import logging
logging.basicConfig(level=logging.INFO)

payment_dict = dict([])

def payment(request):
    
    paypalrestsdk.configure({
  "mode": "sandbox", # sandbox or live
  "client_id": "Ae1pKBCvRfFGO1b79mkBbFG2WGCXLCRN72azuy64IM50n9o0YuodZqZLeTx_",
  "client_secret": "EGYvNBBl4T7S77xWrncN35MwttCcH-VmQpYLYuj-l6qM02np_w4e4wgDCaRh" })
    
    payment = paypalrestsdk.Payment(
{
  "intent": "sale",
  "payer": 
    {
     "payment_method": "paypal"
    },
   "redirect_urls": {
    "return_url": "http://127.0.0.1:8000/SwappingApp/paypal_success/",
    "cancel_url": "http://127.0.0.1:8000/SwappingApp/paypal_error/" },
  "transactions": 
    [
     {
      "item_list": 
      {
       "items": 
       [
        ]
      },
        "amount": 
        {
          "total": "204.00",
          "currency": "EUR" ,
           "details": {
                       "subtotal": "200.00",
                       "tax": "4.00",
                       "shipping": "0.00"}
        },
      "description": "This is the payment transaction description." 
    }
     ]
})
    items = []
    subtotal = 0
    for item in request.session['carrito']:
        cadena = {
        "name": item.title,
        "sku":  item.id,
        "price":  "%0.2f" % item.price,
        "currency": "EUR",
        "quantity": item.quantity }
        items.append(cadena)
        subtotal += item.price * item.quantity
    taxes = 0.0;
    delivery_cost = 0.00;
    order_total = 0.00;
    limit = 300;
    percentage = 0.02;
    if  subtotal > limit:
        taxes = limit * percentage;
    else:
        taxes = subtotal * percentage;
    payment.transactions[0].item_list.items = items
    print "%0.2f" % (subtotal + taxes + delivery_cost)
    print "%0.2f" % subtotal
    print "%0.2f" % taxes
    print "%0.2f" % delivery_cost
    payment.transactions[0].amount.total = "%0.2f" % (subtotal + taxes + delivery_cost)
    payment.transactions[0].amount.details.subtotal = "%0.2f" % subtotal
    payment.transactions[0].amount.details.tax = "%0.2f" % taxes
    payment.transactions[0].amount.details.shipping = "%0.2f" % delivery_cost
    
    #payment.transaction[0].item_list.items.add({'name':'Cheap Guitar','sku':'Guitar','price':27.8,'currency':'EUR'})

    if payment.create():
        
        payment_dict.update({('payment_id',request.user.id):[payment.id,False]})
        print("Payment[%s] created successfully"%(payment.id))
        # Redirect the user to given approval url
        for link in payment.links:
            if link.method == "REDIRECT":
                redirect_url = link.href
                print("Redirect for approval: %s"%(redirect_url))
                response_data = {}
                response_data['url'] = redirect_url
                return HttpResponse(json.dumps(response_data), content_type="application/json",status=200)
    else:
        print 'errorrr'
        print(payment.error)
        

def execute_payment(request):
    print request.build_absolute_uri()
    PayerID = request.GET['PayerID']
    print PayerID
    print payment_dict
    # ID of the payment. This ID is provided when creating payment.
    if ('payment_id',request.user.id) in payment_dict:
        payment = Payment.find(payment_dict[('payment_id',request.user.id)][0])
    else:
        return HttpResponseRedirect("/home?paypal_error=true")
    
    if not payment_dict[('payment_id',request.user.id)][1]:
        # PayerID is required to approve the payment.
        if payment.execute({"payer_id": PayerID}):  # return True or False
          print("Payment[%s] execute successfully"%(payment.id))
          payment_dict[('payment_id',request.user.id)][1] = False
          create_swap_with_money(18539,0.00,6.00,request)
          return HttpResponseRedirect('/paypal_trasaction_success')
        else:
          print(payment.error) 
          return HttpResponseRedirect("/home?paypal_error=true")
      
def create_swap_with_money(subtotal,shipping_cost,taxes,request):
    tax = Tax(limit=300,percentage=0.02)
    tax.save()
    my_payment = SwappingApp.models.Payment(managed_by_us=True,profit=taxes,tax = tax)
    my_payment.save()
    address1 = SwappingApp.models.Address(street="Reina Mercedes",number=45,zip_code=41012,city="Seville",
                                         street_type="Avenida",others="4 C")
    address1.save()
    address2 = SwappingApp.models.Address(street="Virgen de la Esperanza",number=4,zip_code=41012,city="Seville",
                                         street_type="Avenida",others="2 Derecha")
    address2.save()
    buyer = UserApp.objects.get(id=request.user.id)
    
    swap = Swap_With_Money(date=datetime.datetime.now(),total = (subtotal + shipping_cost + taxes ),
                           comments="This is incredible",
                           shipping_cost=shipping_cost,pick_up_location=address1,destination=address2,
                           payment = my_payment,user=buyer)
    swap.save()
    uuid = '' + str(swap.id) + '-' + str(request.user.id) + '-' + toHex(str(datetime.datetime.now))
    swap.uuid = uuid[:10]
    swap.save()
    
    
def payment_credits(request, total, credits):
    
    paypalrestsdk.configure({
  "mode": "sandbox", # sandbox or live
  "client_id": "Ae1pKBCvRfFGO1b79mkBbFG2WGCXLCRN72azuy64IM50n9o0YuodZqZLeTx_",
  "client_secret": "EGYvNBBl4T7S77xWrncN35MwttCcH-VmQpYLYuj-l6qM02np_w4e4wgDCaRh" })
    
    payment = paypalrestsdk.Payment(
{
  "intent": "sale",
  "payer": 
    {
     "payment_method": "paypal"
    },
   "redirect_urls": {
    "return_url": "http://127.0.0.1:8000/SwappingApp/paypal_success/",
    "cancel_url": "http://127.0.0.1:8000/SwappingApp/paypal_error/" },
  "transactions": 
    [
     {
      "item_list": 
      {
       "items": 
       [
        ]
      },
        "amount": 
        {
          "total": total,
          "currency": "EUR" ,
           "details": {
                       "subtotal": "200.00",
                       "tax": "4.00",
                       "shipping": "0.00"}
        },
      "description": "This is the payment transaction description." 
    }
     ]
})
    items = []
    subtotal = 0
    cadena = {
    "name": "credits",
    "sku":  "0001",
    "price":  "%0.2f" % 1,
    "currency": "EUR",
    "quantity": credits }
    items.append(cadena)
    item = items[0]
    print item
    print total
    subtotal += int(total)
    taxes = 0.0;
    delivery_cost = 0.00;
    order_total = 0.00;
    limit = 300;
    percentage = 0.02;
    if  subtotal > limit:
        taxes = limit * percentage;
    else:
        taxes = subtotal * percentage;
    payment.transactions[0].item_list.items = items
    print "%0.2f" % (subtotal + taxes + delivery_cost)
    print "%0.2f" % subtotal
    print "%0.2f" % taxes
    print "%0.2f" % delivery_cost
    payment.transactions[0].amount.total = "%0.2f" % (subtotal + taxes + delivery_cost)
    payment.transactions[0].amount.details.subtotal = "%0.2f" % subtotal
    payment.transactions[0].amount.details.tax = "%0.2f" % taxes
    payment.transactions[0].amount.details.shipping = "%0.2f" % delivery_cost
    
    #payment.transaction[0].item_list.items.add({'name':'Cheap Guitar','sku':'Guitar','price':27.8,'currency':'EUR'})

    if payment.create():
        
        payment_dict.update({('payment_id',request.user.id):[payment.id,False]})
        print("Payment[%s] created successfully"%(payment.id))
        # Redirect the user to given approval url
        for link in payment.links:
            if link.method == "REDIRECT":
                redirect_url = link.href
                print("Redirect for approval: %s"%(redirect_url))
                return str(redirect_url)
    else:
        print 'errorrr'
        print(payment.error)
    
     
    
#convert string to hex
def toHex(s):
    lst = []
    for ch in s:
        hv = hex(ord(ch)).replace('0x', '')
        if len(hv) == 1:
            hv = '0'+hv
        lst.append(hv)
    
    return reduce(lambda x,y:x+y, lst)

def create_payment_credits(subtotal,shipping_cost,taxes,request):
    #Como los creditos cuestan 1, sumar a credits el subtotal (integer), y guardar en bbdd el pago
    return null
        