# Generated by Django 2.0.2 on 2020-07-07 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0013_auto_20200707_1245'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cnpj',
            field=models.CharField(blank=True, default='', max_length=15, verbose_name='CNPJ'),
        ),
    ]