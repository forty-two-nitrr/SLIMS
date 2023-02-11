from rest_framework import serializers
from .models import *

class PolePowerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PolePower
        fields = "__all__"

class StreetLightSerializer(serializers.ModelSerializer):
    power = PolePowerSerializer(read_only = True, many = True)
    class Meta: 
        model = StreetLight
        fields = "__all__"