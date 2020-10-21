from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'SampleWithDatabase.views.home', name='home'),
    # url(r'^SampleWithDatabase/', include('SampleWithDatabase.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    
    url(r'^admin/', include(admin.site.urls)),
    url(r'^home$', 'SwappingApp.views.home'),
    
    url(r'^paypal_trasaction_success$','SwappingApp.views.paypal_transaction_success'),
    url(r'^Swapping/media/ajax_upload/$', 'SwappingApp.views.import_uploader', name="uploader"),
    url(r'^$', 'SwappingApp.views.init'),
    url(r'^logout$', 'SwappingApp.views.logout_user'),
    #Incluye las urls de sistemaevaluacion
    url(r'^SwappingApp/', include('SwappingApp.urls')),
    
    url(r'^ajax-uploader/', include('ajaxuploader.urls', namespace='ajaxuploader', app_name='ajaxuploader')),
    url(r'', include('social_auth.urls')),
    
    
    url (r'^uploaded/photos/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    
  #  url (r'^SwappingApp/paypal/', include('paypal.standard.ipn.urls')),
    
   
)
