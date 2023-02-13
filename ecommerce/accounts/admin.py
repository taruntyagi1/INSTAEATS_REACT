from django.contrib import admin
from accounts.models import User

# Register your models here.
class custom_admin(admin.ModelAdmin):
    list_display = ['username','email',
                    'first_name','last_login','is_active']
admin.site.register(User,custom_admin)