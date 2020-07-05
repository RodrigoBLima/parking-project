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
 
    def create(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()                     

        return Response({'save': 'true'}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk=None, format=None):
        idEmployee = self.request.GET.get('id')
        Empregados.objects.filter(id=idEmployee).delete()

        return Response(status=status.HTTP_204_NO_CONTENT) 