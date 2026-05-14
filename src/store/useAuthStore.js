import { create } from 'zustand'

const useAuthStore = create((set,get) => ({
    user:null,
    isLoggedIn:false,
    cartCount:0,

    login:(userData,token)=>{
        localStorage.setItem("userToken",token);
        localStorage.setItem("user",JSON.stringify(userData))

        set({
            user:userData,
            isLoggedIn:true,
        });
    },

    incrementCart:(count)=>{
        const currentCount=get().cartCount;
        set({cartCount:currentCount+count});
    },

    setCartCount:(count)=>{
        set({cartCount:count})
    },
logout:()=>{
        const confirmLogout=window.confirm("Are you sure you want to logout?");

        if(confirmLogout){
            localStorage.clear();
            set({
                user:null,
                isLoggedIn:false,
                cartCount:0,
            })
        }
    },
    
    initializeAuth:()=>{
        const token=localStorage.getItem("userToken");
        const storedUser=localStorage.getItem("user");

        if(token && storedUser){
            set({
                isLoggedIn:true,
                user:JSON.parse(storedUser),
            });
        }
    },
  
}));

export default useAuthStore
