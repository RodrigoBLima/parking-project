# Generated by Django 3.0.7 on 2020-06-15 22:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_empregados_idestacionamento'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vehicules', '0002_auto_20200615_2233'),
    ]

    operations = [
        migrations.AddField(
            model_name='veiculos',
            name='idEstacionamento',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='establishment_vei', to=settings.AUTH_USER_MODEL, verbose_name='Estacionamento id'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='veiculos',
            name='idFuncionario',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='employee_id', to='employees.Empregados', verbose_name='Funcionario id'),
            preserve_default=False,
        ),
    ]
