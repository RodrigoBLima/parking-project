# Generated by Django 2.0.2 on 2020-07-07 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0011_auto_20200707_1243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cnpj',
            field=models.CharField(blank=True, default='', max_length=15, verbose_name='CNPJ'),
        ),
    ]
