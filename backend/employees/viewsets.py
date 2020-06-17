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