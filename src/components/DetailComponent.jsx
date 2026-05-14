import React, { useEffect, useState } from 'react'
import { API_URL } from '../repo/api_path'
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';

const DetailComponent = () => {
  const{id}=useParams();

  const[product,setProduct]=useState(null);
  const[loading,setLoading]=useState(true);

  const{isLoggedIn,incrementCart}=useAuthStore();

  const singleHandler=async()=>{
    try{
      const res=await axios.get(`${API_URL}/api/${id}`)
      console.log("checking for data:",res.data);
      setProduct(res.data.record); 
        }catch(error){
          console.log(error.response?.data || error.message);
        }finally{
          setLoading(false);
        }

    };

    useEffect(()=>{
      singleHandler()
    },[id]);
  
  
    const addToCartHandler=async()=>{
      try{
        if(!isLoggedIn){
          alert("Please login first");
          return;
        }
        const token=localStorage.getItem("userToken");

        const res=await axios.post(`${API_URL}/cart/add-to-cart`,
          {productId:product._id,quantity:1},
          {
            headers:{Authorization:`Bearer ${token}`}
          },        
      );

        alert(res.data.message);
        incrementCart(1);


      }catch(error){
        console.log(error.response?.data || error.message);
        alert(error.response?.data?.msg||"Something went wrong");
      }
    };

    if(loading) return <h2>Loading...</h2>
    if(!product) return <h2>Product not found</h2> 


  return (
    <div className="detailSection">

      <div className="imgCont">
        <img className='singleImage' src={`${API_URL}${product.image}`} alt={product.name}/>
      </div>

      <div className="singleDetail">

        <div className="singleName"> {product.name}</div>
        <div className="singlePrice"> Price: {product.price}</div>
        <div className="singleDesc">Description: {product.desc}</div>

        <div className="singleBtn">
          <button className='singleCartBtn' onClick={addToCartHandler}>Add To Cart</button>
          <button className='singleLaterBtn'>Save for later</button>
        </div>


      </div>

    </div>
    
  )
}

export default DetailComponent
