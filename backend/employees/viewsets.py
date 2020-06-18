from .models import Empregados
from .serializers import EmpregadosSerealizer
from rest_framework import viewsets, decorators, generics, filters, mixins, response,  status
from rest_framework.response import Response
from django.http import HttpResponse
from .filtersets import EmployeeFilter

class EmployeesViewSet(viewsets.ModelViewSet):     
    queryset = Empregados.objects.all()
    serializer_class    = EmpregadosSerealizer
    filter_class        = EmployeeFilter
 
    # def put(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)

    #     # print('update')
    #     # # print(self.get_object(id))
    #     # serializer = self.get_serializer(data=request.data,partial=True)
    #     # print(request.data)
    #     # # print(request.data)
    #     # print(request.data['id'])
    #     # serializer.is_valid(raise_exception=True)
    #     # a =        Empregados.objects.filter(id=request.data.id)
    #     # print( a )
    #     # serializer.save()
    #     serializer = EmpregadosSerealizer(data=request.data, partial=partial)

    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data)

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
        # print(self.request.GET.get('id'))
        idEmployee = self.request.GET.get('id')
        # print(opa1)
        # # print(pk)
        # # idEstacionamento
        # print(opa)
        # print(pk)
        Empregados.objects.filter(id=idEmployee).delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 