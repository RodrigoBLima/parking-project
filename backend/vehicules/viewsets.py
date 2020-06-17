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
    # permission_classes = (IsAuthenticated,FarmPermission)  
    # permission_classes = (AllowAny)
    # permission_classes = [IsAuthenticated]
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['id']
    # def get_queryset(self):
    #     print(self.request.data)
    #     return Veiculos.objects.filter(pk=self.request.data.id)
    # def post(self, request, format=None):
    #     print('é foda')
    #     serializer = CarsSerealizer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def perform_create(self, request, pk=None):
    #     print('cabecinha')
    #     # serializer.save()
#     def partial_update(request, *args, **kwargs):
#         print("partial")
# ?
    def put(self,request, *args, **kwargs):
        print('update')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"update": "true"}, status=status.HTTP_200_OK)
        # data_in = request.data
        # print(data_in)

        # instance = self.get_object()
        # serializer = self.get_serializer(instance, data=request.data, partial=False)
        # serializer.is_valid(raise_exception=True)

        # if instance is None:
        #     lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        #     lookup_value = self.kwargs[lookup_url_kwarg]
        #     extra_kwargs = {self.lookup_field: lookup_value}
        #     serializer.save(**extra_kwargs)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # serializer.save()
        # data_out = serializer.data
        # return Response(serializer.data)

    # def update(self, request, pk=None):
    #     print("update")
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()

    #     return Response({"update": "true"}, status=status.HTTP_200_OK)

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