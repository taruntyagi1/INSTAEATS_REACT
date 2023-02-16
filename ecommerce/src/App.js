
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import Product from './components/product';
import 'react-multi-carousel/lib/styles.css';
import Slider from "react-slick";
// import { Card, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Carousel } from 'react-responsive-carousel';

function App() {
  const [product, setProduct] = useState([]);
  
  const fetchProducts = async () => {
    const response = await axios.get('http://127.0.0.1:8000/product/')
    try {
      setProduct(response.data)
      console.log(response.data)
    } catch (error) {
      console.log('error' + error)
    }
  }

  
  useEffect(()=>{
    fetchProducts();
  },[]);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  return (
    <div className="App">
      <Header />
      

      <div>
        <h2> Responsive Product Carousel</h2>
        <Slider {...settings} key = {product.id}>
          {product.map((product,index) =>(

          <Product id = {product.id} key = {index} image = {product.image} title = {product.title} price = {product.price} product ={product} />
          ))}
        </Slider>
      </div>
     
    </div>
  );
}

export default App;
