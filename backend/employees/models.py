from django.db import models
from datetime import date, datetime, timedelta


class Empregados(models.Model):
    name = models.CharField(max_length=80,blank=False, verbose_name="Nome do funcionario")
    credential = models.CharField(max_length=15, blank=True,verbose_name="Identificação", unique=True)
    cellphone = models.CharField(max_length=50, verbose_name="Telefone", blank=True)
    cpf = models.CharField(max_length=50, verbose_name="Cpf", blank=True,unique=True)
    rg = models.CharField(max_length=50, verbose_name="Rg", blank=True,unique=True)
    country = models.ForeignKey('location.Country', on_delete=models.PROTECT, verbose_name="País", related_name='employee_country',default=32)
    location = models.CharField(max_length=80, verbose_name="Localidade", default="")
    office = models.CharField(max_length=80, verbose_name="Cargo", default="")
    dt_nasc =models.DateTimeField(auto_now=False, auto_now_add=False, verbose_name="Data Nascimento")
    dt_ini = models.DateTimeField(auto_now=False, auto_now_add=False, default=datetime.now, verbose_name="Data entrada")
    dt_end = models.DateTimeField(auto_now=False, auto_now_add=False, default=datetime.now, verbose_name="Data Saida")

    idEstacionamento   = models.ForeignKey(
        'parking.User',
        on_delete=models.CASCADE,
        related_name='establishment_emp',
        verbose_name="Funcionario Estabelecimento"
    )

    def __str__(self):
        return self.name
