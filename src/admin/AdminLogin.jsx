import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../repo/api_path'

const AdminLogin = () => {
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const navigate=useNavigate()

    const adminLoginHandler=async(e)=>{
        e.preventDefault();
        try{
        const res=await axios.post(`${API_URL}/admin/admin-login`,{
                email,password
            })
            console.log(res.data)
            localStorage.setItem("adminToken",res.data.token);
            alert("Admin login success")
            
            setPassword("")
            setEmail("")
            navigate("/add-product")
        }catch(error){
            alert("login failed")
        }

    }
  return (
    <div className='emailSection'>

        <div className="emailHeading">
            *Please enter your Email and Password 
        </div>

        <form className="emailForm" onSubmit={adminLoginHandler}>

            <h3>Email</h3>
            <input type="email" placeholder='Please enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <h3>Password</h3>
            <input type="password" placeholder='Please enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            
            <button type='submit'>Submit</button>

        </form>
      
    </div>
  )
}

export default AdminLogin
