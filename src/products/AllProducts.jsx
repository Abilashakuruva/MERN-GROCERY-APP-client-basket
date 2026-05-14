import React, { useEffect, useState } from 'react'
import { API_URL } from '../repo/api_path'
import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import useSearchStore from '../store/useSearchStore'
import { Link } from 'react-router-dom'

const AllProducts = () => {
    const[basket,setBasket]=useState([])
    const[unitPrice,setUnitPrice]=useState({})
    const[quantity]=useState(1)

    const{incrementCart}=useAuthStore()
    const{search}=useSearchStore()

    

    const productHandler=async()=>{
        try{
            const res=await axios.get(`${API_URL}/api/show-products`)
            console.log("checking for data:",res.data);
            setBasket(res.data.newProducts)


        }catch(error){
          console.log(error.message)

        }

    }

    useEffect(()=>{
      productHandler()
    },[])

    const handleUnitChange=(productId,unit,basePrice)=>{
      let price=basePrice;

      if(unit==="500g") price=basePrice/2;
      if(unit==="2kg") price=basePrice*2;
      if(unit==="5kg") price=basePrice*5;

      setUnitPrice((prev)=>({
        ...prev,
        [productId]:price,
      }));
    };

    const cartHandler=async(productId,quantity)=>{
      const userToken=localStorage.getItem("userToken");

      try{
        await axios.post(
          `${API_URL}/cart/add-to-cart`,
          {productId,quantity},
          {
            headers:{Authorization:`Bearer ${userToken}`}
          }

        );

        alert("Product added to cart");
        incrementCart(quantity);


      }catch(error){
        alert("Please login to buy the products")
      }
    };

    const filteredProducts= basket?.filter((product)=>{
      return product?.name?.toLowerCase().includes(search.toLowerCase())
    });
    console.log("Search:",search);

    
    
  return (
    <div className="productSection">
      {filteredProducts?.map((product)=>{
        // console.log(product.image)
        return(
          <section className='proSection' key={product._id}>
            <Link to={`/single/${product._id}`}>
            <div className="proImage">
              <img src={`${API_URL}${product.image}`} alt={product.name}/>
              <h3 className='proName'>{product.name}</h3>
            </div>
            </Link>

            <div className="proSub">
              <select className='proSelect' onChange={(e)=>handleUnitChange(product._id,e.target.value,product.price)}>
                <option>1kg</option>
                <option>2kg</option>
                <option>5kg</option>
              </select>
              <h3 className='proPrice'>
                Rs {unitPrice[product._id] ?? product.price}
              </h3>
            </div>
            <button className='proButton' onClick={()=>cartHandler(product._id,quantity)}>Add to Cart</button>

          </section>
        )
      })}
     
    </div>
  )
}

export default AllProducts
