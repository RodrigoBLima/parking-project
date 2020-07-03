from django.db import models
from datetime import date, datetime, timedelta

# Create your models here.

class Veiculos(models.Model):
    board  = models.CharField(max_length=80,blank=False, verbose_name="Placa veiculo")
    model = models.CharField(max_length=80,blank=False, verbose_name="Modelo do carro")
    brand = models.CharField(max_length=80,blank=False, verbose_name="Marca do veiculo")
    year = models.CharField(max_length=80,blank=False, verbose_name="Ano de fabricacao")
    color = models.CharField(max_length=80,blank=False, verbose_name="Cor do veiculo")
    owner = models.CharField(max_length=80,blank=False, verbose_name="Nome do dono")
    h_enter   = models.DateTimeField(auto_now=False, auto_now_add=False,default=datetime.now, verbose_name="Data entrada")
    h_exit            = models.DateTimeField(auto_now=False, auto_now_add=False,verbose_name="Data Saida")
    idEstacionamento   = models.ForeignKey(
        'parking.User',
        on_delete=models.CASCADE,
        related_name='establishment_vei',
        verbose_name="Estacionamento id"
    )
    idFuncionario  = models.ForeignKey(
    'employees.Empregados',
        on_delete=models.CASCADE,
        related_name='employee_id',
        verbose_name="Funcionario id"
    )
    
    def __str__(self):
        return self.board