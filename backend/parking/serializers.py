from rest_framework import serializers
from .models import User


class EstablishmentSerializer(serializers.ModelSerializer):
    name_country = serializers.SerializerMethodField()

    def get_name_country(self, obj):
        return obj.country.name

    class Meta:
        model = User
        fields = ('name_establishment', 'cep', 'location',
                  'vacancies', 'country', 'cnpj', 'email', 'name_country', 'username', 'id',
                  'value_hour')
        extra_kwargs = {'password': {'write_only': True}}


class PasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

