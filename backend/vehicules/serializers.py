from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Veiculos


class CarsSerealizer(serializers.ModelSerializer):
    class Meta:
        model = Veiculos
        fields = ('__all__')
