
from rest_framework import viewsets

from .models import User

from .serializers import EstablishmentSerializer, PasswordSerializer

from rest_framework import viewsets, decorators, response, status

from .filtersets import UserFilter


class EstablishmentViewSet(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = EstablishmentSerializer
    filter_class = UserFilter

    def create(self, request, *args, **kwargs):
        serializer = EstablishmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        print('***************')
        print(request.data)
        print('***************')
        user.set_password(serializer.validated_data.get('password'))
        user.save()
        headers = self.get_success_headers(serializer.data)

        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @decorators.action(detail=False, methods=['get'])
    def me(self, request, pk=None):
        return response.Response(self.serializer_class(request.user, context={'request': request}).data)

    @decorators.action(detail=True, methods=['put'], serializer_class=PasswordSerializer)
    def set_password(self, request, pk=None):
        serializer = PasswordSerializer(data=request.data)
        user = self.get_object()
        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return response.Response({'old_password': ['Senha antiga inválida.']}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return response.Response({'status': 'Senha atualizada com sucesso'}, status=status.HTTP_200_OK)

        return response.Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
