import React, { useState,useEffect } from 'react'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import axios from 'axios';
import { 
    MDBBtn, 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBCard, 
    MDBCardBody, 
    MDBCardImage, 
    MDBInput, 
    MDBIcon, 
    MDBCheckbox 
  } 
  from 'mdb-react-ui-kit';

export default function Register() {
    const style1  = {
        backgroundColor : '#eee',
        borderRadius : "25px"

    }
    const [regsiterForm,setRegisterForm] = useState({
        'first_name' : '',
        'last_name' : '',
        'email' : '',
        'username' : '',
        'phone_number' : '',
        'password' : '',
       
    })
    
    const handlechange = (event)=>{
       setRegisterForm({...regsiterForm,[event.target.name] : event.target.value})
    }

    const handlesubmit = async(e)=>{
        e.preventDefault();
        alert('submit')
        const response = await axios.post('http://127.0.0.1:8000/register/',{
            regsiterForm
        })
        const data = await response.data
        console.log(data)
    }
  return (
    <>
    <Header/>
    <section class="vh-100" style={{...style1}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{...style1}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example1c1" value={regsiterForm.first_name} name='first_name' onChange={handlechange} class="form-control" />
                      <label class="form-label" htmlFor="first_name">Your Name</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example1c2" value={regsiterForm.last_name} name='last_name' onChange={handlechange} class="form-control" />
                      <label class="form-label" htmlFor="last_name">Last Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c3" value={regsiterForm.email} name='email' class="form-control" onChange={handlechange}/>
                      <label class="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c4" value={regsiterForm.username} name='username' class="form-control" onChange={handlechange}/>
                      <label class="form-label" htmlFor="username">Your username</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c5" value={regsiterForm.phone_number} name='phone_number' class="form-control" onChange={handlechange}/>
                      <label class="form-label" htmlFor="phone_number">Your number</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c6" value={regsiterForm.password} name='password' class="form-control" onChange={handlechange}/>
                      <label class="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  {/* <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" class="form-control" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onClick={handlesubmit} class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    



      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
        />
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
        />

    
      
    
    </>
  )
}
