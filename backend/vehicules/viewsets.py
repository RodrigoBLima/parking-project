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

    # def put(self,request, *args, **kwargs):
#         print('update')
#         # print(self.get_object(pk)
# # ) 
#         # print(request.data)
#         # print(request.data['id'])


#         serializer = self.get_serializer(data=request.data,partial=True)
#         # print(serializer)
#         serializer.is_valid(raise_exception=True)
        # serializer.save()

        # return Response({"update": "true"}, status=status.HTTP_200_OK)
  

    def create(self, request, pk=None):
        print('create')
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        serializer.save()     
                    
        # vehicule.save()

        return Response({'save': 'true'}, status=status.HTTP_201_CREATED)

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