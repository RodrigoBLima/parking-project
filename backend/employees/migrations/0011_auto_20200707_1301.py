# Generated by Django 2.0.2 on 2020-07-07 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0010_auto_20200707_1243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empregados',
            name='cellphone',
            field=models.CharField(blank=True, max_length=11, verbose_name='Telefone'),
        ),
        migrations.AlterField(
            model_name='empregados',
            name='cpf',
            field=models.CharField(blank=True, max_length=14, unique=True, verbose_name='Cpf'),
        ),
        migrations.AlterField(
            model_name='empregados',
            name='office',
            field=models.CharField(default='', max_length=50, verbose_name='Cargo'),
        ),
        migrations.AlterField(
            model_name='empregados',
            name='rg',
            field=models.CharField(blank=True, max_length=11, unique=True, verbose_name='Rg'),
        ),
    ]
