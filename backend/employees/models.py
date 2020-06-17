from django.db import models

class Empregados(models.Model):
    nome = models.CharField(max_length=80,blank=False, verbose_name="Nome do funcionario")
    credential = models.CharField(max_length=9, blank=True,verbose_name="Identificação")
    telefone = models.CharField(max_length=50, verbose_name="Telefone", blank=True)
    cpf = models.CharField(max_length=50, verbose_name="Cpf", blank=True)
    rg = models.CharField(max_length=50, verbose_name="Rg", blank=True)
    pais = models.ForeignKey('location.Country', on_delete=models.PROTECT, verbose_name="País", related_name='employee_country',default=32)
    localidade = models.CharField(max_length=80, verbose_name="Localidade", default="")
    cargo = models.CharField(max_length=80, verbose_name="cargo", default="")
    dt_nasc = models.CharField(max_length=80, verbose_name="Data Nascimento", default="")
    dt_ini = models.CharField(max_length=80, verbose_name="Data entrada", default="")
    dt_end = models.CharField(max_length=80, verbose_name="Data Saida", default="")

    idEstacionamento   = models.ForeignKey(
        'parking.User',
         on_delete=models.CASCADE,
         related_name='establishment_emp',
          verbose_name="Funcionario Estabelecimento"
    )

    def __str__(self):
        return self.nome
