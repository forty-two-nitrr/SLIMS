from django.urls import path

from .views import *

urlpatterns = [
    path('lights/', LightsAPI.as_view()),
    path('poles/', PolePowerAPI.as_view())
]
