# Generated by Django 2.0.2 on 2020-07-03 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicules', '0006_auto_20200703_2217'),
    ]

    operations = [
        migrations.AlterField(
            model_name='veiculos',
            name='year',
            field=models.IntegerField(max_length=4, verbose_name='Ano de fabricacao'),
        ),
    ]
