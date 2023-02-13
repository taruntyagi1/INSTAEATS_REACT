// import React, { useEffect, useState } from 'react'
// import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';







export default function Product(props) {
  // const [user_id,setUserId] = useState('')
  const data1 = JSON.parse(localStorage.getItem("data"));
  const user_id = data1.id
  console.log(data1)
  const navigate = useNavigate();
  
  const price = props.price
  console.log(price)

  // useEffect(()=>{
  //   if(data1){
  //     setUserId(data1.id)
  //   } else{
  //     setUserId('')
  //   }

  // },[data1])
  
  const addToCart = async()=>{
    
    const response = await axios.post(`http://127.0.0.1:8000/add/${props.id}/`,{
      user_id,price
    })
    console.log(response.data)
    
    
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
