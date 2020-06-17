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
    #permission_classes = (IsAuthenticated,FarmPermission)  
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['id']

    def delete(self, request, pk=None, format=None):
        # print("VAAAI")
        # opa = self.request.GET.get('idEstacionamento')
        print(self.request.GET.get('id'))
        idEmployee = self.request.GET.get('id')
        # print(opa1)
        # # print(pk)
        # # idEstacionamento
        # print(opa)
        # print(pk)
        Empregados.objects.filter(id=idEmployee).delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 