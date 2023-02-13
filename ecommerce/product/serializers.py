from rest_framework import serializers
from product.models import *

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id','category_name','slug','image','description','is_active','is_featured','is_public'
        )



class VariantSerializer(serializers.ModelSerializer):
    
   
    class Meta:
        model = Variant
        fields = (
            'id','product','title','slug','stock_record','description','price','image','is_active','is_featured','is_public'
        )

    
    


        

class ProductSerializer(serializers.ModelSerializer):
    variant = serializers.SlugRelatedField(many = True,read_only = True,slug_field= 'title')
    category = CategorySerializer()
    class Meta:
        model  = Product
        fields = (
          'id','category','variant',"title",'slug','stock_record','description','price','image','is_active','is_featured','is_public',
        )

        def get_image_url(self,obj):
             return obj.image.url
        

class cartserializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = (
            'user',
            
        )
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128)



class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = (
            'user',
            'cart',
            'product',
            'price',
            'quantity',
            
        )
    