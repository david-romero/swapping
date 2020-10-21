# Django settings for SampleWithDatabase project.
import os
DEBUG = True
TEMPLATE_DEBUG = DEBUG
RUTA_PROYECTO = os.path.dirname(os.path.realpath(__file__))
ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'swapping',                      # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'swapping',
        'PASSWORD': 'swappingISPP',
        'HOST': 'localhost',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '5432',                      # Set to empty string for default.
    }
}

JS_URL = 'http://localhost:8000/'
CSS_URL = 'http://localhost:8000/'
LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/members/'
LOGIN_ERROR_URL = '/login-error/'
# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'Europe/Madrid'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'es-ES'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT =  os.path.dirname(os.path.realpath(__file__)) + '\uploaded\photos\\'


# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = 'http://localhost:8000/uploaded/photos/'

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = ''

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(RUTA_PROYECTO, 'static'),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'p(ej)71ec@gukk#wpz&e1l)#k3%$*)52-id*o_bk9xbep=^yys'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)
TEMPLATE_CONTEXT_PROCESSORS = (
  "social_auth.context_processors.social_auth_by_type_backends",
  "django.contrib.auth.context_processors.auth",
)

SOCIAL_AUTH_ENABLED_BACKENDS = ('google','facebook','twitter')

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'Swapping.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'Swapping.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(RUTA_PROYECTO, 'templates'),
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'django.contrib.admindocs',
    'rest_framework',
    'django_filters',
    'table_prefix',
    'SwappingApp',
    'ajaxuploader',
    'social_auth',
    'taggit',
)
#Social auth
AUTHENTICATION_BACKENDS = (
    'social_auth.backends.twitter.TwitterBackend',
    'social_auth.backends.facebook.FacebookBackend',
    'social_auth.backends.google.GoogleOAuthBackend',
    'social_auth.backends.google.GoogleOAuth2Backend',
    'social_auth.backends.google.GoogleBackend',
    'django.contrib.auth.backends.ModelBackend',
)




SOCIAL_AUTH_DEFAULT_USERNAME = 'new_social_auth_user'
SOCIAL_AUTH_UID_LENGTH = 16
SOCIAL_AUTH_ASSOCIATION_HANDLE_LENGTH = 16
SOCIAL_AUTH_NONCE_SERVER_URL_LENGTH = 16
SOCIAL_AUTH_ASSOCIATION_SERVER_URL_LENGTH = 16
SOCIAL_AUTH_ASSOCIATION_HANDLE_LENGTH = 16

 
GOOGLE_OAUTH2_CLIENT_ID = '634168777210-2vnn5jmaubn37nm0utm86shunfom00ad.apps.googleusercontent.com'
GOOGLE_OAUTH2_CLIENT_SECRET = 'SflRmVmPV3qBG9BMWPXtT04E'

TWITTER_CONSUMER_KEY = '0B0AKVLY5ZeWNrOsU21Vw'
TWITTER_CONSUMER_SECRET = 'Y4FNYiZf8t505LnVwYmKSLWdBYHsGigIhTcbPZBzvA'

FACEBOOK_APP_ID='736908119683074'
FACEBOOK_API_SECRET='628550c15d9ed81cc61c3c39c005584d'

SESSION_SERIALIZER='django.contrib.sessions.serializers.PickleSerializer'

AWS_UPLOAD_BUCKET_NAME = "bucket-to-upload-to"
AWS_UPLOAD_CLIENT_KEY = "public-aws-upload-key"
AWS_UPLOAD_CLIENT_SECRET_KEY = "secret-aws-upload-key"
AWS_UPLOAD_BUCKET_NAME = "bucket-to-upload-to"
AWS_UPLOAD_CLIENT_KEY = "public-aws-upload-key"
AWS_UPLOAD_CLIENT_SECRET_KEY = "secret-aws-upload-key"


REST_FRAMEWORK = \
    {
        'FILTER_BACKEND': 'rest_framework.filters.DjangoFilterBackend',
        'DATETIME_INPUT_FORMATS': ['%d/%m/%Y %H:M:%S'],
        'DATETIME_FORMAT': '%d/%m/%Y %H:%M:%S',
        'DATE_INPUT_FORMATS': ['%d/%m/%Y'],
        'DATE_FORMAT': '%d/%m/%Y',
    }

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'swappingapp@gmail.com'
EMAIL_HOST_PASSWORD = 'swapping'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

FIXTURE_DIRS = \
    (
        os.path.join(RUTA_PROYECTO+'../SwappingApp', 'fixtures')
    )
