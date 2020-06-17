from .serializers import CountrySerializer
from rest_framework import viewsets
from .models import Country

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer