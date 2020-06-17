import rest_framework_filters as filters
from .models import User
import django_filters


class UserFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = {
            'id':  ['exact'],

        }
