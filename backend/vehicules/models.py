from django.db import models
from datetime import date, datetime, timedelta

# Create your models here.

class Veiculos(models.Model):
    placa  = models.CharField(max_length=80,blank=False, verbose_name="Placa veiculo")
    modelo = models.CharField(max_length=80,blank=False, verbose_name="Modelo do carro")
    marca = models.CharField(max_length=80,blank=False, verbose_name="Marca do veiculo")
    ano = models.CharField(max_length=80,blank=False, verbose_name="Ano de fabricacao")
    cor = models.CharField(max_length=80,blank=False, verbose_name="Cor do veiculo")
    proprietario = models.CharField(max_length=80,blank=False, verbose_name="Nome do dono")
    h_entrada   =models.DateTimeField(auto_now=False, auto_now_add=False,default=datetime.now, verbose_name="Data entrada")
    h_saida            = models.DateTimeField(auto_now=False, auto_now_add=False,verbose_name="Data Saida")
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
        return self.placa