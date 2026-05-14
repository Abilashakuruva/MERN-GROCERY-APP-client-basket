import React, { useState } from 'react'
import { API_URL } from '../repo/api_path'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SendOtp = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const navigate=useNavigate()

    const emailHandler=async(e)=>{
        e.preventDefault()
        try{
            const res=axios.post(`${API_URL}/email/send-otp`,{
                name,email
            })
            console.log(res.data)
            alert("OTP sent to your email")
            localStorage.setItem("userEmail",email)
            localStorage.setItem("userName",name)
            setName("")
            setEmail("")
            navigate("/verify-otp")
        }catch(error){
            alert("failed to send OTP")
        }

    }

  return (
    <div className='emailSection'>

        <div className="emailHeading">
            *Please enter your Name and Email for OTP
        </div>

        <form className="emailForm" onSubmit={emailHandler}>

            <h3>Name</h3>
            <input type="text" placeholder='Please enter your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            
            <h3>Email</h3>
            <input type="email" placeholder='Please enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            
            <button type='submit'>Send OTP</button>

        </form>
      
    </div>
  )
}

export default SendOtp
