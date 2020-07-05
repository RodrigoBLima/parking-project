from .models import Veiculos
from .serializers import CarsSerealizer
from rest_framework import viewsets, decorators, generics, filters, mixins, response,  status
from rest_framework.response import Response
from django.http import HttpResponse
from .filtersets import VehiculesFilter
from rest_framework.permissions import IsAuthenticated

class CarsViewSet(viewsets.ModelViewSet):     
    queryset = Veiculos.objects.all()
    serializer_class    = CarsSerealizer
    filter_class        = VehiculesFilter

    def create(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)        
        serializer.is_valid(raise_exception=True)
        serializer.save()                     

        return Response({'save': 'true'}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk=None, format=None):        
        idVehicule = self.request.GET.get('id')
        Veiculos.objects.filter(id=idVehicule).delete()

        return Response(status=status.HTTP_204_NO_CONTENT) 
