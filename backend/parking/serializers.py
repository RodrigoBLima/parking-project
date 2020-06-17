from rest_framework import serializers
from .models import User


class EstablishmentSerializer(serializers.ModelSerializer):
    nome_pais = serializers.SerializerMethodField()

    def get_nome_pais(self, obj):
        return obj.pais.name

    class Meta:
        model = User
        fields = ('name_establishment', 'cep', 'location',
                  'vagas', 'pais', 'cnpj', 'email', 'nome_pais')
        extra_kwargs = {'password': {'write_only': True}}
