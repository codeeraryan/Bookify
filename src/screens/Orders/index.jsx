import React from 'react'
import { useEffect } from 'react'
import { usefirebase } from '../../context/Firebase';
function Orders() {
 const firebase=usefirebase();
    //    useEffect(()=>{firebase.fetchMyOrders().then((books)=>{books.docs()})})
useEffect(()=>{console.log(firebase.order)},[])
  return (
    <div className='h-[80vh] w-full flex justify-center items-center'>
      <span className='flex flex-col justify-center items-center'><img 
        src="/images/noOrder.avif" 
        alt="No Order" 
        className="max-w-xs mx-auto mb-4"
      />
      <h1>No orders yet</h1></span>
    </div>
  )
}

export default Orders
