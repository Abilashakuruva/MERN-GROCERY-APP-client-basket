import React, { useState } from 'react'
import { API_URL } from '../repo/api_path'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import axios from 'axios'

const OtpVerify = () => {
    const userEmail=localStorage.getItem("userEmail")
     const[email,setEmail]=useState(userEmail)
     const[otp,setOtp]=useState("")
     const navigate=useNavigate()
     const{login}=useAuthStore.getState()

    const otpHandler=async(e)=>{
        e.preventDefault()
        const userName=localStorage.getItem("userName")
        try{
            const res=await axios.post(`${API_URL}/email/verify-otp`,{
                email,otp
            })
            console.log(res.data)
            alert("verification successful")
            login(userName,res.data.token)
            navigate("/")

        }catch(error){
            alert("wrong OTP")

        };
        
    }
  return (
    <div className='emailSection'>

        <div className="emailHeading verify">
            OTP Verification
        </div>

        <form className="emailForm" onSubmit={otpHandler}>
            <div className='' style={{color:"red"}}>
                OTP valid only for 5mins
            </div>

            <h3>Email</h3>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <h3>OTP</h3>
            <input type="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} />
            
            <button type='submit'>Verify OTP</button>

        </form>
      
    </div>
  )
}

export default OtpVerify
