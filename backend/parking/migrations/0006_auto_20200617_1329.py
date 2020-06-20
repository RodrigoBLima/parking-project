# Generated by Django 2.0.2 on 2020-06-17 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0005_auto_20200617_1211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cnpj',
            field=models.CharField(blank=True, default=0, max_length=15, verbose_name='CNPJ'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='vagas',
            field=models.IntegerField(blank=True, default=0, verbose_name='Vagas'),
        ),
    ]