import React, { useState } from 'react'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();

  
    const style1  = {
        backgroundColor : '#eee',
        borderRadius : "25px"

    }
    const [registerForm,setRegisterForm] = useState({
        first_name : '',
        last_name : '',
        email : '',
        username : '',
        phone_number : '',
        password : '',
        repeat_password : '',
       
    })
    
    const handlechange = (event)=>{
       setRegisterForm({...registerForm,[event.target.name] : event.target.value})
    }

   

    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
        
        const response = await axios.post('http://127.0.0.1:8000/register/', registerForm);
        const data = response.data;
        console.log(data);
        alert('Registration successful!');
        navigate('/login')
      } catch (error) {
        console.log(error.response.data);
        alert('Registration failed. Please try again.');
      }
    };
  return (
    <>
    <Header/>
    <section className="vh-100" style={{...style1}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{...style1}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example1c1" value={registerForm.first_name} name='first_name' onChange={handlechange} className="form-control" />
                      <label className="form-label" htmlFor="first_name">Your Name</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example1c2" value={registerForm.last_name} name='last_name' onChange={handlechange} className="form-control" />
                      <label className="form-label" htmlFor="last_name">Last Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c3" value={registerForm.email} name='email' className="form-control" onChange={handlechange}/>
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c4" value={registerForm.username} name='username' className="form-control" onChange={handlechange}/>
                      <label className="form-label" htmlFor="username">Your username</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c5" value={registerForm.phone_number} name='phone_number' className="form-control" onChange={handlechange}/>
                      <label className="form-label" htmlFor="phone_number">Your number</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c6" autoComplete='password' value={registerForm.password} name='password' className="form-control" onChange={handlechange}/>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c7" autoComplete='password' value={registerForm.repeat_password} name='repeat_password' className="form-control" onChange={handlechange}/>
                      <label className="form-label" htmlFor="repeat_password"> Repeat Password</label>
                    </div>
                  </div>

                  {/* <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" class="form-control" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox"  id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample"/>

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
