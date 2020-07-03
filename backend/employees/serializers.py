from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Empregados


class EmpregadosSerealizer(serializers.ModelSerializer):
    name_country = serializers.SerializerMethodField()

    def get_name_country(self, obj):
        return obj.country.name

    class Meta:
        model = Empregados
        fields = ('__all__')
