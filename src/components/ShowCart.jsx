import React, { useEffect, useState } from 'react'
import { API_URL } from '../repo/api_path'
import Checkout from './Checkout';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';

const ShowCart = () => {
  const[cartDetail,setCartDetail]=useState(null);
  const[loading,setLoading]=useState(true);
  const{setCartCount}=useAuthStore()

   const cartHandler=async()=>{
      const userToken=localStorage.getItem("userToken");

      try{
        const res=await axios.get(`${API_URL}/cart/cart-details`,        
          {
            headers:{Authorization:`Bearer ${userToken}`}
          }

        );

        setCartDetail(res.data.cart);
        setCartCount(res.data.cart.items.length||0)
        setLoading(false);


      }catch(error){
        console.error(error.response?.data || error.message);
        setLoading(false);
      }
    };

     useEffect(()=>{
          cartHandler()
        },[])

  const deleteHandler=async(productId)=>{
    const userToken=localStorage.getItem("userToken")
    try{
      const res=await axios.delete(`${API_URL}/cart/delete/${productId}`,{
        headers:{
          Authorization:`Bearer ${userToken}`
        }
      });
      console.log(res.data)
      alert("product deleted")
      cartHandler()

    }catch(error){
      alert(error.message)
    }
  }
  
  if(loading) return <h3>Loading cart...</h3>;
  if(!cartDetail || cartDetail.items.length===0)
    return <div className='cartEmpty'>Your cart is empty</div>



  return (
    <div className="cartContainer">
      <div className="cartTitle">
        My Cart
      </div>
      {cartDetail.items.map((item)=>{
        if(!item.product) return null;

        return(
          <div className="cartItem" key={item._id}>
            <img src={`${API_URL}${item.product.image}`} alt={item.product.name} width="80"/>
            
            <div className="subCart">
              <h4>{item.product.name}</h4>
              <p>Price: Rs {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p> Rs {item.product.price * item.quantity}</p>
              <button className='cartDelete' onClick={()=>deleteHandler(item.product._id)}>Delete</button>
            </div>
            
    </div>

        );
      })}
      <Checkout/>

    </div>
  )
}

export default ShowCart
