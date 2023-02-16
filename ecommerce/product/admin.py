from django.contrib import admin
from product.models import *

# Register your models here.
class custom_product(admin.ModelAdmin):
    list_display = ['category','title','stock_record','price','image','is_active']
    ordering = ('id',)

class custom_category(admin.ModelAdmin):
    list_display = ['category_name','image','is_active']
    ordering = ('id',)

class custom_variant(admin.ModelAdmin):
    list_display = ['product','title','stock_record','price','image','is_active']
    ordering = ('id',)
class customcart(admin.ModelAdmin):
    list_display  = ['user','is_paid']
    ordering =  ('id',)

class customItems(admin.ModelAdmin):
    list_display = ['user','product','variant','cart']


class custom_address(admin.ModelAdmin):
    list_display = ['user','address','default_address']
    ordering =('id',)
admin.site.register(Category,custom_category)
admin.site.register(Product,custom_product)
admin.site.register(Variant,custom_variant)
admin.site.register(Cart,customcart)
admin.site.register(CartItem,customItems)
admin.site.register(UserAddress,custom_address)


