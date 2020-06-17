from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Empregados


class EmpregadosSerealizer(serializers.ModelSerializer):
    class Meta:
        model = Empregados
        fields = ('__all__')
