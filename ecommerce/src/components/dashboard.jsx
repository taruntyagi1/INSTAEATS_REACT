import React from 'react'
//eslint-disable-next-line
import { Card } from 'react-bootstrap'
import Header from './header'
import './index.css'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
    <Header/>
    
    <div className='user_dashboard'>
    <Card style={{ width: "inherit" }} id = "user_card">
       
        <Card.Body>
          <Card.Title className='card_title'>DASHBOARD</Card.Title>
          <Card.Text>
          <p className='user_profile'>My profile</p>
           <span> <i className='line'></i></span>
           <p className='user_orders'><a href="#/">My orders</a></p>
           <span> <i className='line'></i></span>
           
           <p className='user_address'><Link to='/address'>Address</Link></p>
           <span> <i className='line'></i></span>
          </Card.Text>
          <div className="product-actions">
           
          
          
          </div>
        </Card.Body>
      </Card>
      
    </div>

    <div className='user_dashboard_sidebar'>

      <Card style={{ width: "inherit" }} id = "order_sidebar">
      <Card.Body>
          <Card.Title className='orders_title'>Total orders</Card.Title>
          <Card.Text>
          
          </Card.Text>
          <div className="product-actions">
           
          
          
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}
