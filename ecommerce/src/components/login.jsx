import React, {  useEffect, useState } from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";
import Header from './header';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';




export default function Login() {
    const [email,setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const [token ,setToken]  = useState('')
    const [userId,setUserId] = useState('')
    
    
    const navigate = useNavigate()
    
    
    
    const handleLogin = async(event) =>{
        event.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/login/',{
            email,password
        })
        console.log(event.target.value)
        // console.log(response.data)
        const data = await response.data
        // console.log(data)
        const expiresIn = 3600
        
        localStorage.setItem('expire' , expiresIn)
        localStorage.setItem('data', JSON.stringify(data));
    // Update the state with the new token
        setToken(data);
        console.log(token)
        
        setTimeout(()=>{
            localStorage.removeItem('data')
            localStorage.removeItem('expire')
            navigate('/login')
 
        },expiresIn * 1000)
        
        
        
    };

    const token_data= JSON.parse(localStorage.getItem('data'))
    
    
    
    useEffect(()=>{
        if (token_data){
            
            setUserId(token_data.id)
            console.log(userId)
            navigate('/')
            
        }else{
            setUserId('')
            navigate('/login')
        }
        
        
        
    },[navigate,token_data,userId])


    
   
    
    
    
    return (
        <>
        <Header/>
        <div className='login_form'>
            <Card>

                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAMAAAC9ZjJ/AAAAYFBMVEX///8AAAB8fHzy8vL19fX7+/vg4OBra2ugoKDS0tLu7u7m5ubd3d1iYmIlJSWcnJy3t7cREREvLy+Dg4NycnIqKirLy8tKSkrBwcGsrKw3NzdXV1c/Pz8aGhqSkpKLi4vTL81aAAAE8ElEQVR4nO1baZeqMAyVXWRTcVhU5P//y3F0XpNWhJY2dc55vV+l9NJmT9xsHBwcHBwcHBwcHBwcHBz+A0T5vrrV9a3ap+GnuWAE6b7wOBR9uvs0qwfi8eJN4DLmn2YWNe0Usyfa5qMX3CXvqT2ud/8xatlpntoPkvgz3PaHZW539B+gFtZS1O7wrUteNqMIIq6Wrza7ynPzvKNVq5K/7p/UfZfGcdr1dXJ++Tm1xy07CnsXTR7Bz1HeiCamtHazIa+m53FC4qNROL7ADreIN29jNv1YduMeS+zobIX3bGekKeU0+maDW8oJ22zwEXCi19BzC3EMUkcLT4/4kOnFDl9qvfw4ZldRc8OaepJZ4FvUWORRW7kVheLXrMfui+1USvqkHC2hjd2RxEmHQntL5iQAVW2XFBUAiy6UUoccvoLVQpaRMgAAdSjkD24TgS2mVIlBXeJ+AFI3UDG76yrb5KqkdwGEpnShE5xAorYQ4hi6dAeCIMV8tGMLRxpmG+yK3sRw7wDyQKYRIXgiBV19gGkSmaWDdPCquhRWKp65NDKWFlxUlzJLd6RS15glXcqSw6z3F1UKC/GFRJTJ40ZP7i+fXMxkrlBdeiInB9p6Vl1Kr62BCTtHFQyjVH+9h1D9LGlAnrfatyrruTR6OAC1heCUtzTM7sjYHqvjOcIyIttD7V7hVj0qZhucQyR/L4do4AgU8qgYVlFWmgKouCkEJmAeW9KUH1UrpaUOSRxtATGG5FA2MoMo0BuIS/6oHix5sajKpJizKQNMnWQmhYuN5PV+vJmECCk+rokdbiwtOqMePXy20FlHts7z/NlML8A1VxvVdL7K6xUzChhzYwnENddfhHxja3xzWzu+g1NY6i/tuF29azXV+6qEhqy1UY504DcuT+kOdw2D/CT0FQ9WBO6XnSei9LfPfmvTb32x42lJGRi7qeGDQ3k8lpNTCVa53RNshT761WKf+omsWGb1xIUqVZ3DbZnXD+hqmTPoJY/uQpdwvUHQy43jPLG1Oq/WTU6lvUfbWaMWKFJ70LN0eP2wzOUVBxuiF/pvNh+Gc1sU7bkc3ohjQn546YTxPRR13yBjljX9WEww/CJ2FF35suVln09EQ0E+oTQD6SDi9oVZNROmhdsXfoQDEiK3a7cQQYadKAVk7EaBmpQIieOwPg034dzmLhQjFNfRc1MJNYQAhoBdx2+gNHAW8R9mXGfR6Moak9Bxyw0HnwEWa9lZHIwY5xWGc388FHxe9eGcazGaYO8NfHaoVGSRByrVe+VqgUmP+l84ARSI6AhzihyzsToiTqG15kKwdBiKUFAbQdf5IAdYmBnNReZXdyYUWyQzphhpg7b1RBKi3FCeAqpkGogo0MWayMiguG/inwOoK2FAYRtIBoxYTlTC1ldYVKs30wGH92mX/qPS3LuegPBp0LUmoF6loUoWkjrde4VwxDc114BeqfeiCIycsfgVjPpV714hAD6YGwhhtZb1Ec4DoPgG25EQ5OiNl64eIZ0D+Bytkiya0jRYdYae7UVH6HYkg6Dok3UCYvhGozNI4P11vDVIh9E0HVyiTmQCcbXRsW0zr2XKejBaDm+YKOv4CBbLDUYrppCG6VhPltpo2nIBMfM7ypOpCKxsavYvoBkjpzyqjVD5v6iNduij+t97yf9E5+Dg4ODg4ODg4ODg4OBAhm+wFjLuY6kBcgAAAABJRU5ErkJggg==" id="icon" alt="User Icon" />
                        </div>
                        <form>
                            <input type="text" id="email" value={email} onChange = {(e) => setEmail(e.target.value)} className="fadeIn second" name="email" placeholder="email" />
                            <input type="text" value={password} onChange = {(e) => setPassword(e.target.value)} id="password" className="fadeIn third" name="password" placeholder="password" />
                            <input onClick={handleLogin} type="submit" className="fadeIn fourth" value="Log In" />
                        </form>
                        <div id="formFooter">
                            <a className="underlineHover" href="/">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </Card>

        </div>
        </>
    )
}
