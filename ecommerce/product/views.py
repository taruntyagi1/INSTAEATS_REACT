from django.shortcuts import render, HttpResponse
from rest_framework import serializers
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from product.serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.utils.translation import gettext as _
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.db import transaction
from django.contrib.auth.hashers import make_password
from django.contrib.sessions.backends.db import SessionStore
# Create your views here.


class ProductView(ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class AddToCart(APIView):
    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            user_id = request.data.get('user_id')
            price = request.data.get('price')
            
            # Check if user_id is provided in the request
            if user_id:
                user = User.objects.get(id=user_id)
                cart, created = Cart.objects.get_or_create(user=user)
                
                # Merge session_cart with user cart
                session_cart = request.session.get('cart', {})
                print('session_cart',session_cart)
                for item_id, item_data in session_cart.items():
                    cart_item, created = CartItem.objects.get_or_create(product_id=item_id, cart=cart, user=user)
                    if created:
                        cart_item.quantity = item_data['quantity']
                        cart_item.price = cart_item.product.price * cart_item.quantity
                        cart_item.save()
                    else:
                        cart_item.quantity += item_data['quantity']
                        cart_item.price += cart_item.product.price * item_data['quantity']
                        cart_item.save()
                # Clear session_cart after merging with user cart
                del request.session['cart']
            else:
                # If user_id is not provided, just add the item to session_cart
                session_cart = request.session.get('cart', {})
                if product_id in session_cart:
                    session_cart[product_id]['quantity'] += 1
                else:
                    session_cart[product_id] = {
                        'quantity': 1,
                        'price': price,
                    }
                request.session['cart'] = session_cart
                
            return JsonResponse({
                'message': 'added to cart',
            })
        
        except Product.DoesNotExist:
            return JsonResponse({
                'message': 'Product does not exist'
            })
        
        except User.DoesNotExist:
            return JsonResponse({
                'message': 'User does not exist'
            })
            

            
            
                



            
            


class CartView(APIView):
    def get(self, request):
        cart = CartItem.objects.get(user=request.user.id)
        serializers = cartserializer(cart).data
        return Response(serializers, status=status.HTTP_200_OK)


class LoginView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.data['email']
            password = serializer.data['password']
            user = authenticate(email=email, password=password) 

            if user:
                
                    if user.is_active:
                        token, created = Token.objects.get_or_create(user=user)
                        return Response({'token': token.key,
                        'email' : user.email,
                        'id' : user.id,
                        'username' : user.username},status=status.HTTP_200_OK)
                    else:
                        content = {'detail': _('User account not active.')}
                        return Response(content,
                                        status=status.HTTP_401_UNAUTHORIZED)
                
            else:
                content = {'detail':
                           _('Unable to login with provided credentials.')}
                return Response(content, status=status.HTTP_401_UNAUTHORIZED)

        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

     
    

class CartItemView(APIView):
     def post(self,request):
          userID = request.data.get('userID')
          user = User.objects.get(id = userID)
          cartitem = CartItem.objects.filter(user  = user)
          total_price = 0
          for items in cartitem:
              total_price += items.price
          serializer = CartItemSerializer(cartitem,many = True).data
          return Response({'cart_items': serializer, 'total_price': total_price,'price' : items.price},status=status.HTTP_200_OK)
@csrf_exempt  
@api_view(['POST',])
def increase_cart(request):
     user_id = request.data.get('userID')
     product_id = request.data.get('product_id')
     product = Product.objects.get(id = product_id)
     user = User.objects.get(id = user_id)
     # product = Product.objects.get(id = product_id)
     cart_item = CartItem.objects.get(product = product,user = user)
     cart_item.quantity += 1
     cart_item.price = cart_item.product.price * cart_item.quantity
     cart_item.save()
     return JsonResponse({
          'message' : cart_item.quantity,
          'price' : cart_item.price
     })


@csrf_exempt
@api_view(['POST',])
def decrease_cart(request):
     user_id = request.data.get('userID')
     product_id = request.data.get('product_id')
     product = Product.objects.get(id = product_id)
     user = User.objects.get(id = user_id)
     cart_item = CartItem.objects.get(product = product,user = user)
     cart_item.quantity -= 1
     cart_item.price = cart_item.product.price - cart_item.quantity
     cart_item.save()
     return JsonResponse({
          'message' : cart_item.quantity
     })


     

     
     
class CountView(APIView):
     def post(self,request):
        userID = request.data.get('userID')
        try:
            user = User.objects.get(id=userID)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=404)
        count_cart = CartItem.objects.filter(user=user)
        count  = 0
        for items in count_cart:
             count += items.quantity
             
        return JsonResponse({'message': count})

     


class User_address(APIView):

    def get(self,request):
        address = UserAddress.objects.all()
        serializer = AdressSerializer(address,many = True).data
        return Response(serializer,status=status.HTTP_200_OK)

    


class User_regsiter(APIView):


    def get(self,request):
        user =User.objects.all()
        serializer = Userserializer(user,many = True).data
        return Response(serializer,status=status.HTTP_200_OK)


    def post(self,request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        phone = request.data.get('phone_number')
        password = request.data.get('password')
        repeat_password = request.data.get('repeat_password')
        if password == repeat_password:
            password = make_password(password)
        else:
            return JsonResponse({
                'invalid' : 'password not match'
            })
        user = User.objects.create(first_name = first_name,last_name = last_name,email = email,username = username ,phone_number = phone,password = password)
        serialzier = Userserializer(user).data
        return Response(serialzier,status=status.HTTP_200_OK)
            


class AddressView(APIView):

    def get(self,request):
        user_id =  request.GET.get('user_id')
        print(user_id)
        user = User.objects.get(id = user_id)
        address = UserAddress.objects.filter(user = user)
        full_name = user.first_name   +  "  "  +  user.last_name
        serializer = AdressSerializer(address,many = True).data
        return Response({'address' : serializer, 'name' : full_name})


    def post(self,request):
        user_id = request.data.get('user_id')
        user = User.objects.get(id=user_id)
        address = request.data.get('address')
        default_address = request.data.get('default_address')
        if UserAddress.objects.filter(user = user).exists():
            return JsonResponse({
                'message' : 'user address is already exists'
            })
        else:

        
            is_default = False
            if address == default_address:
                is_default = True
            else:
                is_default = False

            user_address = UserAddress.objects.create(
                user=user,
                address=address,
                default_address=is_default
            )
            serializer = AdressSerializer(user_address).data
            return Response(serializer, status=status.HTTP_201_CREATED)
        

class CArtCount(APIView):

    def get(self,request):
        user_id = request.GET.get('user_id')
        user = User.objects.get(id = user_id)
        cart = Cart.objects.filter(user = user)
        return Response({
            'message' : 'cart is found'
        })