import rest_framework_filters as filters
from vehicules.models import Veiculos
from django.db import models as django_models
import django_filters


class VehiculesFilter(filters.FilterSet):
    class Meta:
        model = Veiculos
        fields = {
            'id':  ['exact'],
            'idEstacionamento': ['exact']
        }
