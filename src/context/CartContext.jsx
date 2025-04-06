import { createContext, useContext } from "react";
import { useState } from "react";
const cartContext=createContext(null)
export const useCart=()=>useContext(cartContext);
export const CartProvider=(props)=>{
 
 const[cart,setCart]=useState([]);
 const[url,setURL]=useState("");

 
    return(
<cartContext.Provider value={{setCart,cart,url,setURL}}>{props.children}</cartContext.Provider>
    )
}