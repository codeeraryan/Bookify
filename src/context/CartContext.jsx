import { createContext, useContext } from "react";
import { useState } from "react";
const cartContext=createContext(null)
export const useCart=()=>useContext(cartContext);
export const CartProvider=(props)=>{
 
 const[cart,setCart]=useState([]);
 const[result,setResult]=useState("");
 const [data,setData]=useState([]);

 
    return(
<cartContext.Provider value={{setCart,cart,result,setResult,data,setData}}>{props.children}</cartContext.Provider>
    )
}