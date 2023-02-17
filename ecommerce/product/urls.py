from django.contrib import admin
from django.urls import path
from product.views import *
from . import views
urlpatterns = [
    path('product/',ProductView.as_view()),
    # path('add/<int:product_id>/<int:user_id>/',views.add_to_cart,name='add'),
    path('add/<int:product_id>/',AddToCart.as_view()),
    path('cart/',CartView.as_view()),
    path('login/',LoginView.as_view()),
    path('cart_view/',CartItemView.as_view()),
    path('increase/',views.increase_cart,name='increase'),
    path('count/',CountView.as_view(),name='count'),
    path('decrease/',views.decrease_cart,name='decrease'),
    path('register/',User_regsiter.as_view()),
    path('address/',AddressView.as_view()),
    path('cart_count/',CArtCount.as_view()),
    
]