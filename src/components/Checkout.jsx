import React from 'react'
import { Link } from 'react-router-dom'

const Checkout = () => {
  return (
    <div className="checkoutBox">
      <Link to="/invoice">
      <button className='checkoutBtn'>Proceed to checkout</button>
      </Link>
    </div>
    
  )
}

export default Checkout
