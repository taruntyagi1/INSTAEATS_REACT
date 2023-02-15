import React, { useEffect, useState } from 'react'
import Header from './header'
import './index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiPlus,FiMinus } from 'react-icons/fi'

export default function Cart() {
    const base_url  = "http://127.0.0.1:8000"
    const navigate = useNavigate();
    const [product,setProduct] = useState([])
    const [totalPrice,settotalPrice] = useState(0)
    const [price,setPrice] = useState(0)
    
    const backshopping = ()=>{
        navigate('/')
    }
    const style1 = {
      backgroundColor : '#d2c9ff',


    }
    const style2 = {
        borderRadius : '15px'
    }
    const [cart, setCart] = useState([]);
    
    const [userID,setuserId] = useState(0)
    

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('data'))
      setuserId(data.id)
      if (userID) {
        axios.post('http://127.0.0.1:8000/cart_view/', {
            userID
        })
          .then(res => {
            setCart(res.data.cart_items);
            settotalPrice(res.data.total_price)
            
            console.log('price', totalPrice)
           
            console.log('cart',cart)
            
            
            console.log('res',res.data)
            
           
          })
          .catch(error => {
            console.error(error);
          });
      }
      

    }, [userID]);
    
    

    

    const handleproduct = async()=>{
        const response = await axios.get('http://127.0.0.1:8000/product/')
        setProduct(response.data)
        console.log('product' , response.data)
    }
    useEffect(()=>{
        handleproduct();
    },[])
    // const product_id = product.id

    
    
    const handleadd = async(product_id)=>{
        // let updateQuantity = cart.find(c => c.product.id === product_id).quantity + 1;
        const response = await axios.post('http://127.0.0.1:8000/increase/',{
            userID,product_id
        })
        
        
        console.log('add', response.data);
        const productIndex = cart.findIndex(c => c.product.id === product_id);

        // Update the quantity of the product
        const updatedCart = [...cart];
        updatedCart[productIndex].quantity = response.data.message;
      
        // Call a setter function to update the cart state with the new quantity
        setCart(updatedCart);
        console.log('update',updatedCart)
        
    }
    const handleremove = async(product_id)=>{
        const response = await axios.post('http://127.0.0.1:8000/decrease/',{
            userID,
            product_id
        })
        console.log(response.data)
        const productIndex = cart.findIndex(c => c.product.id === product_id);

        // Update the quantity of the product
        const updatedCart = [...cart];
        updatedCart[productIndex].quantity = response.data.message;
      
        // Call a setter function to update the cart state with the new quantity
        setCart(updatedCart);
        console.log('update',updatedCart)
    }
    
    


    return (
    <>
            <Header />
            

            
            <div className="h-100 h-custom" style={{...style1}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{...style2}}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                    <h6 className="mb-0 text-muted">3 items</h6>
                                                </div>
                                                <hr className="my-4"/>
                                                {cart.map((cart,i) =>(
                                                    <div className="row mb-4 d-flex justify-content-between align-items-center" key={i}>
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={base_url+ cart.product.image}
                                                                className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">{cart.product.title}</h6>
                                                            <h6 className="text-black mb-0">{cart.product.desc}</h6>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button className="btn btn-link px-2">
                                                                
                                                                <FiPlus onClick={()=> handleadd(cart.product.id,setPrice(cart.price))}/>
                                                            </button>
                                                            
                                                           

                                                            <input id="form1" min="0" name="quantity" value={cart.quantity} 
                                                            
                                                            
                                                                className="form-control form-control-sm" />
                                                           
                                                          

                                                            <button className="btn btn-link px-2">
                                                                
                                                                <FiMinus onClick={() => handleremove(cart.product.id)}/>
                                                            </button>
                                                            
                                                            
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 className="mb-0">{cart.price}</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                                                        </div>
                                                    </div>
                                                    ))}

                                                    

                                                        

                                                            <hr className="my-4"/>

                                                                <div className="pt-5">
                                                                    <h6 className="mb-0"><a onClick={backshopping} href="#!" className="text-body"><i
                                                                        className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 bg-grey">
                                                            <div className="p-5">
                                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                                <hr className="my-4"/>

                                                                    <div className="d-flex justify-content-between mb-4">
                                                                        <h5 className="text-uppercase">items 3</h5>
                                                                        <h5>{totalPrice}</h5>
                                                                    </div>

                                                                    <h5 className="text-uppercase mb-3">Shipping</h5>

                                                                    <div className="mb-4 pb-2">
                                                                        <select className="select">
                                                                            <option value="1">Standard-Delivery- €5.00</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                            <option value="4">Four</option>
                                                                        </select>
                                                                    </div>

                                                                    <h5 className="text-uppercase mb-3">Give code</h5>

                                                                    <div className="mb-5">
                                                                        <div className="form-outline">
                                                                            <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                                            <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                                        </div>
                                                                    </div>

                                                                    <hr className="my-4"/>

                                                                        <div className="d-flex justify-content-between mb-5">
                                                                            <h5 className="text-uppercase">Total price</h5>
                                                                            <h5>{totalPrice}</h5>
                                                                        </div>

                                                                        <button type="button" class="btn btn-dark btn-block btn-lg"
                                                                            data-mdb-ripple-color="dark">Register</button>

                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </>
                        )
}
