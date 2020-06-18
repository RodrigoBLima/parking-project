from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Empregados


class EmpregadosSerealizer(serializers.ModelSerializer):
    nome_pais = serializers.SerializerMethodField()

    def get_nome_pais(self, obj):
        return obj.pais.name

    class Meta:
        model = Empregados
        fields = ('nome', 'credential', 'telefone', 'cpf', 'rg', 'pais',
                  'localidade', 'cargo', 'dt_nasc', 'dt_ini', 'dt_end', 'nome_pais','id','idEstacionamento')
