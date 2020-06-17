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
    def delete(self, request, pk=None, format=None):
        # print("VAAAI")
        # opa = self.request.GET.get('idEstacionamento')
        idVehicule = self.request.GET.get('id')
        # print(opa1)
        # # print(pk)
        # # idEstacionamento
        # print(opa)
        # print(pk)
        Veiculos.objects.filter(id=idVehicule).delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

    # def destroy(self, request, pk=None):
        
    #     Veiculos.objects.filter(user=pk ).delete()
    #     return response.Response(status=status.HTTP_204_NO_CONTENT)