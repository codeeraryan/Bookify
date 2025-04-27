import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FaCartShopping } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
import { usefirebase } from '../../context/Firebase';
import { useCart } from '../../context/CartContext';
function BookCard(props) {
  const firebase=usefirebase();
  const cartData=useCart();
  const [Notify,setNotify]=useState(false)

  const handleCart=()=>{
    if (!firebase.isLoggedIn) {
      alert('Login first !')
      navigate("/login");
      return;
  }  
  cartData.setCart((prev)=>{return [...prev,props]}); 
  cartData.setURL((prev)=>[...prev,url]);
  setNotify(prev=>!prev);
  
}
  
  const navigate=useNavigate();
  const[url,SetUrl]=useState(null);
  useEffect(()=>{firebase.getImageUrl(props.imageURL).then((url)=>{SetUrl(url);});},[])
 
  return (<>
    
  {/* {Notify?<div className='absolute z-10   ' onClick={()=>setNotify(prev=>!prev)}><Notification msg="Added to cart" book={props.name}/></div>:null} */}
  
<div class="card">
  <div class="wrapper">
    <div class="card-image"><img className='w-[100%] h-[100%]' src={url}/></div>
    <div class="content" >
      <p class="title">{props.name}</p>
      <p class="title price">Price: {props.price}</p>
  <p class=" owner">Book Owner: {props?.userName}</p>
    </div>
    <span className='card-btn flex items-center justify-center gap-2 '><button  onClick={(e)=>{navigate(`/book/view/${props.id}`)}}>View Book</button><GrView /></span>
  </div>
  <p onClick={()=>{handleCart()}} class="tag">{Notify?<FaCheckCircle />:<FaCartShopping />}</p>
</div>

  </>
  )
}

export default BookCard
