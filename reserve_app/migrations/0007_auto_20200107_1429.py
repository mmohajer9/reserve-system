# Generated by Django 2.2.3 on 2020-01-07 14:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reserve_app', '0006_auto_20191229_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='slot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reservations_on_this_datetimeslot', to='reserve_app.DateTimeSlot', unique=True),
        ),
    ]
