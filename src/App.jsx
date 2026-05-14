import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import AllProducts from './products/AllProducts'
import OtpVerify from './user_email/OtpVerify'
import SendOtp from './user_email/SendOtp'
import AddProduct from './admin/AddProduct'
import FruitProducts from './products/FruitProducts'
import VegetableProducts from './products/VegetableProducts'
import FoodGrains from './products/FoodGrains'
import DetailComponent from './components/DetailComponent'
import ShowCart from './components/ShowCart'
import Invoice from './components/Invoice'
import SearchComp from './components/SearchComp'
import AdminLogin from './admin/AdminLogin'
import AdminRoute from './protected/AdminRoute'

const App = () => {
  
  return (

    <div>
      <Navbar/>
      <SearchComp/>

      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/send-otp' element={<SendOtp/>}/>
        <Route path='/verify-otp' element={<OtpVerify/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/add-product' element={<AddProduct/>}/> 
        <Route path="/all-products" element={<AdminRoute><AllProducts/></AdminRoute>}/>
        <Route path='/fruit-products' element={<FruitProducts/>}/>
        <Route path='/vegetables' element={<VegetableProducts/>}/>
        <Route path='/food-grains' element={<FoodGrains/>}/>
        <Route path='/single/:id' element={<DetailComponent/>}/>
        <Route path='/cart' element={<ShowCart/>}/>
        <Route path='/invoice' element={<Invoice/>}/> 
      </Routes>
      
    </div>
  )
}

export default App
