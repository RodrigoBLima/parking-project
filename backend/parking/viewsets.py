
from rest_framework import viewsets

from .models import User

from .serializers import EstablishmentSerializer

from rest_framework import viewsets, decorators, response, status


class EstablishmentViewSet(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = EstablishmentSerializer

    def get_queryset(self):
        # farm_id = self.request.GET.get('farm_id')
        print(self.request.GET.get('id'))
        print('uai')
        print(self.kwargs.get('id'))
        pass

    

    def create(self, request, *args, **kwargs):
        serializer = EstablishmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user.set_password(serializer.validated_data.get('password'))
        user.save()
        headers = self.get_success_headers(serializer.data)

        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @decorators.action(detail=False, methods=['get'])
    def me(self, request, pk=None):
        return response.Response(self.serializer_class(request.user, context={'request': request}).data)
    