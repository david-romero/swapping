from django.conf.urls import patterns, include, url
from SwappingApp import views
from SwappingApp import paypal_services


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'SampleWithDatabase.views.home', name='home'),
    # url(r'^SampleWithDatabase/', include('SampleWithDatabase.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    
    
    #-------------------------------------------------------------
    #Models application url
    #-------------------------------------------------------------"""
    

    url(r'^users/$', views.UserList.as_view(), name='user_list'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user_detail'),
    url(r'^administrator/$', views.AdministratorList.as_view(), name='administrator_list'),
    url(r'^administrator/(?P<pk>[0-9]+)/$', views.AdministratorDetail.as_view(), name='administrator_detail'),
    url(r'^swap_with_money/$', views.Swap_With_MoneyList.as_view(), name='swap_with_money_list'),
    
    url(r'^swap/$', views.SwapList.as_view(), name='swap_list'),
    url(r'^swap/(?P<pk>[0-9]+)/$', views.SwapDetail.as_view(), name='swap_detail'),
    
    
    url(r'^swap_with_money/(?P<pk>[0-9]+)/$', views.Swap_With_MoneyDetail.as_view(), name='swap_with_money_detail'),
    url(r'^user/$', views.UserList.as_view(), name='user_list'),
    url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user_detail'),



    
    url(r'^product/$','SwappingApp.views.get_products'),
    #url(r'^product/(?P<pk>[0-9]+)/$', views.ProductDetail.as_view(), name='product_detail'),
    url(r'^confirm/(?P<code>.+)/(?P<id>[0-9]+)/$', views.confirm_user),
    url(r'^login/', 'SwappingApp.views.auth_login'),
    url(r'^register_user/','SwappingApp.views.create_user'),
    
    url(r'^register_admin/','SwappingApp.views.create_admin'),
    #url(r'^encuestas/$', views.EncuestaList.as_view(), name='encuesta_list'),
    #url(r'^encuestas/(?P<pk>[0-9]+)/$', views.EncuestaDetail.as_view(), name='encuesta_detail'),
    #url(r'^textos/$', views.TextoList.as_view(), name='texto_list'),
    #url(r'^textos/(?P<pk>[0-9]+)/$', views.TextoDetail.as_view(), name='texto_detail'),
    #url(r'^idiomas/$', views.IdiomaList.as_view(), name='idioma_list'),
    #url(r'^idiomas/(?P<pk>[0-9]+)/$', views.IdiomaDetail.as_view(), name='idioma_detail'),
    #url(r'^preguntas/$', views.PreguntaList.as_view(), name='pregunta_list'),
    #url(r'^preguntas/(?P<pk>[0-9]+)/$', views.PreguntaDetail.as_view(), name='pregunta_detail'),
    #url(r'^tipoPreguntas/$', views.RespuestaList.as_view(), name='respuesta_list'),
    #url(r'^tipoPreguntas/(?P<pk>[0-9]+)/$', views.RespuestaDetail.as_view(), name='respuesta_detail'),
    #url(r'^pregunta_valores/$', views.Pregunta_ValoresList.as_view(), name='pregunta_valores_list'),
    #url(r'^pregunta_valores/(?P<pk>[0-9]+)/$', views.Pregunta_ValoresDetail.as_view(), name='pregunta_valores_detail'),
    #url(r'^enunciados/$', views.EnunciadoList.as_view(), name='enunciado_list'),
    #url(r'^enunciados/(?P<pk>[0-9]+)/$', views.EnunciadoDetail.as_view(), name='enunciado_detail'),
    #url(r'^cuestionarios_x_idiomas/$', views.Cuestionario_X_IdiomasList.as_view(), name='cuestionario_x_idiomas_list'),
    #url(r'^cuestionarios_x_idiomas/(?P<pk>[0-9]+)/$', views.Cuestionario_X_IdiomasDetail.as_view(),
    #    name='cuestionario_x_idiomas_detail'),
    
    #End urls application
    url(r'^item/$', views.ItemList.as_view(), name='item_list'),
    url(r'^item/(?P<pk>[0-9]+)/$', views.ItemDetail.as_view(), name='item_detail'),    
    
    url(r'^service/$', views.ServiceList.as_view(), name='item_list'),
    url(r'^service/(?P<pk>[0-9]+)/$', views.ServiceDetail.as_view(), name='item_detail'), 
    url(r'^services/','SwappingApp.views.get_services'),  
    url(r'^items/','SwappingApp.views.get_items'),   
    url(r'^create_item/','SwappingApp.views.confirm_create_item' ),
    url(r'^categories/','SwappingApp.views.categories'),
    url(r'^get_user/','SwappingApp.views.getUser'),
    url(r'^upload_item_photo/','SwappingApp.views.upload_item_photo'),
    url(r'^image_item/','SwappingApp.views.get_item_image'),
    url(r'^get_item_first_image/','SwappingApp.views.get_item_first_image'),
    url(r'^get_item_image/','SwappingApp.views.get_item_image'),
    url(r'^searh_products/','SwappingApp.views.searh_products'),
    url(r'^get_date_active/','SwappingApp.views.get_date_active'),
    url(r'^items_for_user/','SwappingApp.views.items_for_user'),
    url(r'^get_user_item/','SwappingApp.views.get_user_item'),
    
    
    #URL of service
    url(r'^car/$', views.CarList.as_view(), name='car_list'),
    url(r'^car/(?P<pk>[0-9]+)/$', views.CarDetail.as_view(), name='car_detail'),
    url(r'^car_edit/(?P<pk>[0-9]+)/$', views.CarDetailEdit.as_view(), name='car_detail_edit'),
    
    url(r'^hour/$', views.HourList.as_view(), name='hour_list'),
    url(r'^hour/(?P<pk>[0-9]+)/$', views.HourDetail.as_view(), name='hour_detail'),
    url(r'^hour_edit/(?P<pk>[0-9]+)/$', views.HourDetailEdit.as_view(), name='hour_detail_edit'),

    url(r'^estate/$', views.EstateList.as_view(), name='estate_list'),
    url(r'^estate/(?P<pk>[0-9]+)/$', views.EstateDetail.as_view(), name='estate_detail'),
    url(r'^estate_edit/(?P<pk>[0-9]+)/$', views.EstateDetailEdit.as_view(), name='estate_detail_edit'),

    url(r'^new_service/','SwappingApp.views.confirm_create_service' ),
    url(r'^upload_service_photo/','SwappingApp.views.upload_service_photo'),
    url(r'^get_service_photo/(?P<pk>[0-9]+)/$','SwappingApp.views.get_service_photo'),
    url(r'^location/$', views.LocationList.as_view(), name='location_list'),
    url(r'^location/(?P<pk>[0-9]+)/$', views.LocationDetail.as_view(), name='location_detail'),
    
    
    url(r'^message/$', views.MessageList.as_view(), name='message_list'),
    url(r'^message/(?P<pk>[0-9]+)/$', views.MessageDetail.as_view(), name='message_detail'),
    url(r'^new_message/','SwappingApp.views.confirm_create_message' ),
    url(r'^get_messages/$', views.get_messages),
    
    url(r'^comment/$', views.CommentList.as_view(), name='comment_list'),
    url(r'^comment/(?P<pk>[0-9]+)/$', views.CommentDetail.as_view(), name='comment_detail'),
    url(r'^new_comment/','SwappingApp.views.confirm_create_comment' ),
    
    url(r'^news/$', views.NewsList.as_view(), name='news_list'),
    url(r'^news/(?P<pk>[0-9]+)/$', views.NewsDetail.as_view(), name='news_detail'),
    

    #url(r'^/SwappingApp/list_item_user/','SwappingApp.views.getItemUser'),
    

    url (r'^paypal/', 'SwappingApp.paypal.payment'),
    
    url(r'^changepassword/(?P<pk>[0-9]+)/$', 'SwappingApp.views.change_password'),
    
    url(r'^vote_user/(?P<pk>[0-9]+)/$', 'SwappingApp.views.vote_user'),
    
    url(r'^changepassword/(?P<pk>[0-9]+)/$', 'SwappingApp.views.change_password'),
    
    url(r'^paypal_success/','SwappingApp.paypal.execute_payment'),
    
    url(r'^paypal_error/','SwappingApp.paypal.execute_payment'),
    
    url(r'^create_complaint/','SwappingApp.views.create_complaint'),
    url(r'^response_complaint/','SwappingApp.views.response_complaint'),
    url(r'^display_set_display/','SwappingApp.views.display_set_display'),
    
    #This urls is needed for remove items stored in session
    url(r'^remove_shopping_cart_items/','SwappingApp.views.remove_items_in_session'),
    
    #This urls is needed for obtaining items stored in session
    url(r'^shopping_cart_items/','SwappingApp.views.get_items_in_session'),
    url(r'^getcomplaints/$', views.get_complaints),


    url(r'^get_user_photo/(?P<pk>[0-9]+)/$','SwappingApp.views.get_user_photo'),
    url(r'^get_vote_by_voted/(?P<pk>[0-9]+)/$','SwappingApp.views.get_vote_by_voted'),
    
    #Upload photo for user
    url(r'^upload_user_photo/','SwappingApp.views.upload_user_photo'),
    
    url(r'^edit_administrator/','SwappingApp.views.edit_administrator'),
    
    url(r'^edit_user/','SwappingApp.views.edit_user'),

    url(r'^trending_product/','SwappingApp.views.get_trending_products_tags'),
    
    url(r'^get_service_first_image/','SwappingApp.views.get_service_first_image'),
    url(r'^product_renew/','SwappingApp.views.product_renew'),


    url(r'^complaints/(?P<pk>[0-9]+)/$', views.ComplaintDetail.as_view(), name='complaint_detail'),

    url(r'add_item_shopping_cart/','SwappingApp.views.add_item_shopping_cart'),
    
    url(r'add_service_wish/','SwappingApp.views.add_service_wish'),
    url(r'add_item_wish/','SwappingApp.views.add_item_wish'),
    
    url(r'remove_service_wish/','SwappingApp.views.remove_service_wish'),
    url(r'remove_item_wish/','SwappingApp.views.remove_item_wish'),
    
    url(r'list_product_wish/','SwappingApp.views.list_product_wish'),

    url(r'add_item_shopping_cart/','SwappingApp.views.add_item_shopping_cart'),
    
    url(r'swap_with_money_photos/','SwappingApp.views.get_swap_with_money_photos'),
    
    url(r'swap_photos/','SwappingApp.views.get_swap_photos'),
    
    url(r'service/join/','SwappingApp.views.join_user_to_service_api'),
    
    url(r'credits/join/service/','SwappingApp.views.join_user_to_service_credits_api'),
    
    url(r'paypal/join/service/',paypal_services.payment),
    
    url(r'get_user_logged/','SwappingApp.views.get_user_logged'),

    url(r'credits/send_credits/','SwappingApp.views.send_credits'),
    
    url(r'get_services_near/', 'SwappingApp.views.get_services_near'),
    
    url(r'get_services_filtered/','SwappingApp.views.get_services_filtered' )

)
