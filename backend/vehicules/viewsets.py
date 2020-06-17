from .models import Veiculos
from .serializers import CarsSerealizer
from rest_framework import viewsets, decorators, generics, filters, mixins, response,  status
from rest_framework.response import Response
from django.http import HttpResponse
from .filtersets import VehiculesFilter

class CarsViewSet(viewsets.ModelViewSet):     
    queryset = Veiculos.objects.all()
    serializer_class    = CarsSerealizer
    filter_class        = VehiculesFilter
    #permission_classes = (IsAuthenticated,FarmPermission)  
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['id']