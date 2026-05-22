from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'dev'
DEBUG = True
ALLOWED_HOSTS = []

# No admin, auth, or sessions needed
INSTALLED_APPS = [
    'django.contrib.staticfiles',
]

# The URL prefix used to access static files in the browser
STATIC_URL = 'static/'

# Tell Django to look OUTSIDE its own folder into the monorepo
STATICFILES_DIRS = [
    BASE_DIR.parent / 'Resources', 
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [BASE_DIR / 'templates'],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.request',
        ],
    },
}]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {} 

STATIC_URL = 'static/'