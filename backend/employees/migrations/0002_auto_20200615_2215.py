# Generated by Django 3.0.7 on 2020-06-15 22:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employees', '0001_initial'),
        ('location', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='empregados',
            name='idEstacionamento',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='establishment_emp', to=settings.AUTH_USER_MODEL, verbose_name='Funcionario Estabelecimento'),
        ),
        migrations.AddField(
            model_name='empregados',
            name='pais',
            field=models.ForeignKey(default=32, on_delete=django.db.models.deletion.PROTECT, related_name='employee_country', to='location.Country', verbose_name='País'),
        ),
    ]
