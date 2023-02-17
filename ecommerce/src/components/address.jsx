import React from 'react'
import { Card } from 'react-bootstrap'
import Header from './header'
import './index.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Address() {
    const [address, setAddress] = useState([])
    const [username, setUsername] = useState([])

    const style = {
        display: 'flex'
    }

    // const [user_id,setUser_id] = useState('')
    const data = JSON.parse(localStorage.getItem('data'))

    const { id } = data
    const user_id = id
    console.log('user_id', user_id)






    const getAddress = async () => {
        const response = await axios.get('http://127.0.0.1:8000/address/', { params: { user_id } });
        console.log(response.data)
        setAddress(response.data.address)
        setUsername(response.data.name)

    }

    const getcount = async () => {
        const response = await axios.get('http://localhost:8000/cart_count/', { params: { user_id } })
        console.log(response.data.message)
    }


    useEffect(() => {
        getAddress();
        getcount();
    }, [])
    console.log('address', address)


    return (
        <>
            <Header />

            <div className='user_dashboard'>
                <Card style={{ width: "inherit" }} id="user_card">

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



            <div id='user_address' style={{ ...style }} >
                {address.map((address, index) => (

                    <div className="card" id='address_card' key={index}>
                        <div class="card-body p-4">
                            <div class="row">
                                <div class="col-3 text-center">
                                    <i class="fas fa-map-marker-alt fa-3x text-primary"></i>
                                </div>
                                <div class="col-9">
                                    <h5 class="card-title mb-3">Saved Address</h5>
                                    <p class="card-text mb-1">123 Main St</p>
                                    <p class="card-text mb-1">San Francisco, CA 94111</p>
                                    <p class="card-text mb-1">United States</p>
                                    <div class="mt-3">
                                        <button class="btn btn-primary ">Edit</button>
                                        <button class="btn btn-danger mr-2">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}







            </div>
        </>
    )
}
