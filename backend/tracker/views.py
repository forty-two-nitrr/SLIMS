from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class LightsAPI(APIView):
    
    def get(self,request):
        # lights
        print(request.GET.get('id'))
        lights_data = StreetLight.objects.filter(id=request.GET.get('id'))
        # print(lights_data.id)
        serializer = StreetLightSerializer(data=lights_data, many=True)
        # print(serializer.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({'message': "No street light found"}, status=status.HTTP_404_NOT_FOUND)
        # return Response({'message': 'Got Data'})
        return Response({'message': 'Data retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        # pass 
    
    # to register poles 
    def post(self, request):
        serializer = StreetLightSerializer(data = request.data)
        # print(serializer.data)
        if not serializer.is_valid():
            print ("Data Not valid")
            return Response({'message': "Data send Not valid"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        # return Response({'message': 'Posted Data'})
        return Response({'data': serializer.data, 'message': 'Data Saved Successfully'}, status=status.HTTP_201_CREATED)
    
    
class PolePowerAPI(APIView):
    def post(self, request):
        # Save new power data
        pass