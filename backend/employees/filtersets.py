import rest_framework_filters as filters
from employees.models import Empregados
from django.db import models as django_models
import django_filters


class EmployeeFilter(filters.FilterSet):
    class Meta:
        model = Empregados
        fields = {
            'id':  ['exact'],
            'idEstacionamento': ['exact']
        }
