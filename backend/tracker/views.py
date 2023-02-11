from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.

class LightsAPI(APIView):
    
    #get data of specific street light
    def get(self,request):
        id = request.GET.get('id')
        if id!=None:
            streetlight = StreetLight.objects.get(id=id)
            serializer = StreetLightSerializer(streetlight)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        else :
            streetlight = StreetLight.objects.all()
            serializer = IntialStreetLightSerializer(streetlight, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            


    
    # to register poles 
    def post(self, request):
        # check if data already exists
        # id=request.data['id']
        # streetlight = StreetLight.objects.get(id=id)

        # if streetlight != None:
        #     return Response({'message':'Data already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = StreetLightSerializer(data = request.data)
        if not serializer.is_valid():
            print ("Data Not valid")
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        # return Response({'message': 'Posted Data'})
        return Response({'data': serializer.data, 'message': 'Data Saved Successfully'}, status=status.HTTP_201_CREATED)
    
    # update uptime and status 
    def patch(self, request):
        id=request.data['id']
        streetlight = StreetLight.objects.get(id=id)
        if streetlight == None:
            return Response({'message':'Cannot update data does not exitst'}, status=status.HTTP_400_BAD_REQUEST)
        streetlight.uptime = request.data['uptime']
        streetlight.status = request.data['status']
        streetlight.save()
        
        # send mail functionality
        subject = f'Street light with id:{id} failed'
        message = f'Warning: Streetlight having id number = {id} stopped working. Please Fix'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [settings.RECIPIENT_EMAIL]
        print(request.data['status'])
        if request.data['status']=='False':
            send_mail( subject, message, email_from, recipient_list )
            print('mail send successfully')
        return Response({'message': 'Data updated successfully'}, status=status.HTTP_200_OK)
        
    
    
class PolePowerAPI(APIView):
    #to save poles power at each instance
    def post(self, request):
        id = request.data['id']
        power = request.data['power']
        print(request.data['id'])
        streetlight = StreetLight.objects.get(id=id)
        n = PolePower.objects.create(streetLight=streetlight, power=power)
        serializer = PolePowerSerializer(n)
        return Response({'data':serializer.data, 'message': 'Data Saved Successfully'}, status=status.HTTP_201_CREATED)
        # pass