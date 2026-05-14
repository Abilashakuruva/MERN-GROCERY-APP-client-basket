import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../repo/api_path';

const CATEGORY_OPTIONS=[
    "vegetables",
    "fruits",
    "food-grains",
    "meat"
];

const UNIT_OPTIONS=["500g","1kg","2kgs","5kgs"];

const AddProduct = () => {
    const[name,setName]=useState("");
    const[desc,setDesc]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState(CATEGORY_OPTIONS[0]);
    const[unit,setUnit]=useState(UNIT_OPTIONS[0]);
    const[isActive,setIsActive]=useState(true);
    const[image,setImage]=useState(null);

    const[fileKey,setFileKey]=useState(Date.now());

    useEffect(()=>{
        console.log("Product API URL:",API_URL);
    },[]);

    const productHandler=async(e)=>{
        e.preventDefault();

        if(!image){
            alert("Please select an image");
            return;
        }

        const adminToken = localStorage.getItem("adminToken");
        console.log(adminToken)

        const formData=new FormData();
        formData.append("name",name);
        formData.append("desc",desc);
        formData.append("price",price);
        formData.append("category",category);
        formData.append("unit",unit);
        formData.append("isActive",isActive);
        formData.append("image",image);

        try{
            const res=await axios.post(
                `${API_URL}/api/add-product`,
                formData,
                {
                    headers:{"Content-Type":"multipart/form-data",
                        Authorization: `Bearer ${adminToken}`
                        
                    },
                }
            );

            console.log("API RESPONSE:",res.data);
            alert("Product added successfully")
            
            setName("");
            setDesc("");
            setPrice("");
            setCategory(CATEGORY_OPTIONS[0])
            setUnit(UNIT_OPTIONS[0])
            setIsActive(true);
            setImage(null)
            setFileKey(Date.now());
            
        }catch(error){
            console.error(error.response?.data || error.message);
            alert("Failed to add product");
        }



    }

  return (
    <div className="form-container">

        <form className='formSection' onSubmit={productHandler}>

            <h2 className='addTitle'>Add Product</h2>

            <h3>Product Name</h3>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} required/>

            <h3>Description</h3>
            <input type='text' value={desc} onChange={(e)=>setDesc(e.target.value)}/>

            <h3>Price</h3>
            <input type='number' value={price} onChange={(e)=>setPrice(e.target.value)} required/>

            <div className="itemCard">
                <h3>Category</h3>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{border:"1px solid black"}} >
                    {CATEGORY_OPTIONS.map((item)=>(
                        <option key={item} value={item}>{item}</option>
                        ))}
                </select>
            </div>

            <div className="itemCard">
                <h3>Active Product?</h3>
                <label>
                    <input type='checkbox' checked={isActive} onChange={(e)=>setIsActive(e.target.checked)}/>Available
                </label>
            </div>

            <h3>Product Image</h3>
            <input key={fileKey} type='file' accept='image/*' onChange={(e)=>setImage(e.target.files[0])} required/>

            <button type='submit'>Add Product</button>

        </form>

    </div>
      
    
  )
}

export default AddProduct
