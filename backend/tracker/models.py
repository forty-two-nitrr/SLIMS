from django.db import models

# Create your models here.
class StreetLight(models.Model): 
    id = models.IntegerField(primary_key=True)
    status = models.BooleanField(default=False)
    uptime = models.IntegerField(blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=4)
    longitude = models.DecimalField(max_digits=10, decimal_places=4)
    pincode = models.IntegerField()
    
class PolePower(models.Model):
    streetLight = models.ForeignKey(StreetLight,related_name="power", on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    power = models.DecimalField(max_digits=15, decimal_places=2)
    
    
    
    # area, pincode, number of poles & number of  working poles

