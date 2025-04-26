import React, { useState } from 'react'
import { useEffect } from 'react';
function Quotes() {
   const [quote,setQuote]=useState("");
    

const quotes = [
  "Read, learn, grow – the Bookify way.",  
  "Buy books, not cookies.",
  "Reading is my superpower.",
  "Book lovers unite!",
  "Knowledge is power, books are the key.",
  "Get book-struck with Bookify."
];

        const randomIndex =Math.floor(Math.random()*quotes.length);
        console.log(randomIndex);
       
        useEffect(()=>{  setQuote(()=>quotes[randomIndex])},[])
  return (
    <div className='font-[serif]'>
      -"{quote}"
    </div>
  )
}

export default Quotes
