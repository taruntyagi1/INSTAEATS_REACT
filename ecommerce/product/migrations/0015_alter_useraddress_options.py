# Generated by Django 4.1.6 on 2023-02-16 12:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0014_useraddress'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='useraddress',
            options={'verbose_name_plural': 'User Address'},
        ),
    ]