from django.urls import path

from .views import *

urlpatterns = [
    path('lights/', LightsAPI.as_view())
]
