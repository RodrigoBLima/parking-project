from rest_framework import serializers
from .models import Country
from django.db.models.fields import CharField


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields  = ('id', 'name')
