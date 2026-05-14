import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useSearchStore from '../store/useSearchStore';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const{isLoggedIn,user,logout,initializeAuth,cartCount}=useAuthStore();

  const{search,setSearch}=useSearchStore();

  useEffect(()=>{
    initializeAuth();

  },[]);

  return (
    <div className="navSection">

        <Link to="/">
        <div className="title">Small Basket</div>
        </Link>

            <div className="search">
                <input type="text" placeholder='search products...' value={search} onChange={(e)=>setSearch(e.target.value)}  />
            </div>
                
                <Link to="/cart">
                <div className="cart">Cart
                  <span className='text-orange-600 text-2xl'>{" "}{cartCount}</span>
                </div>
                </Link>
                
                <div className="userName">
                  {user && (
                    <>
                    Welcome <span className='userHighlight'>{user}</span>
                    </>
                  )}
                </div>

                
                <div className="auth"> {isLoggedIn ? (
                    <button onClick={logout}>Logout</button>):(
                    <Link to='/send-otp'>
                    <button>Login</button>
                  </Link>
                )}                   
                    </div>              
            
        

    </div>
  )
}

export default Navbar
