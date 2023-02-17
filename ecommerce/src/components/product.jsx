// import React, { useEffect, useState } from 'react'
// import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Add } from './action';

import { useEffect,useState } from 'react';









export default function Product(props) {
  const [user_id,setUserId] = useState('')
  const dispatch = useDispatch();
  const [loggedIN,setLoggedIN] = useState(false)
  
  

  
  const data1 = JSON.parse(localStorage.getItem('data'))
 
  
  


  // const data_id = useSelector((state) => state.user.user)
  // console.log(data_id)

  // const {id} = data_id
  
  // console.log(id)

  // const user_data = data_id.map((userID)=>{
  //   const {id} = userID
  //   setUserId(id)
  // })
  // useEffect(()=>{
  //   user_data();
  // })
  // console.log('user_id', user_id)

  
  const navigate = useNavigate();
  
  const price = props.price
  console.log(price)



  
  

  useEffect(()=>{
    if(data1){
      setUserId(data1.id)
    } else{
      setUserId('')
    }
    if(user_id){
      setLoggedIN(true)
    }else{
      setLoggedIN(false)
    }

  },[data1,loggedIN])
  
  const addToCart = async()=>{
    if(loggedIN){

      const response = await axios.post(`http://127.0.0.1:8000/add/${props.id}/`,{
        user_id,price
      })
      console.log(response.data.cart_item)
     
  
        dispatch(Add(response.data))
      
      }else{
        let sessionCart = JSON.parse(sessionStorage.getItem('cart')) || {}

    if(sessionCart[props.id]){
      sessionCart[props.id]["quantity"] += 1;
    }else{
      sessionCart[props.id] = {
        quantity: 1,
        price: price,
        image : props.image,
        title : props.title
      
      };
    }
    sessionStorage.setItem("cart", JSON.stringify(sessionCart));
      }
    }
    
    
    
  

  

   
  

 
  
  
 

  

  return (
    <div className='products' key={props.id}>
    <Card key={props.id}   style={{ width: "inherit" }}>
        <Card.Img variant="top" src={props.image}  key = {props.id}  />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="product-actions">
            <p>{props.price}</p>
            <Button onClick={() => addToCart(navigate('/cart'))}  variant="primary">Buy Now</Button>
            <Button onClick={addToCart} variant="secondary">Add to cart</Button>
          
          </div>
        </Card.Body>
      </Card>
      
    </div>
  )
}
