import React from 'react'
import { usefirebase } from '../context/Firebase'
import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard';
import { IoSearchCircleSharp} from "react-icons/io5";
import Loader from '../components/Loader';
import Footer from '../components/Footer';

function Home() {
  const firebase = usefirebase();
  const [queryData, SetQueryData] = useState(null)
  
  useEffect(() => {
    firebase.listAllBooks().then((response) => {
      SetQueryData(response.docs);
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative bg-cover  md:bg-cover bg-center bg-no-fixed bg-[url('/public/images/bookshelf.webp')] h-screen" style={{backgroundAttachment: 'fixed'}}>
        <div className='text-center pt-40 flex flex-col gap-6 items-center justify-center text-4xl text-slate-300'>
          <h1 className='text-[80px] flex items-baseline font-[Bangers]'>Bookify</h1>
          <div className='flex'>
            <div className='overflow-hidden  rounded-2xl mt-8  items-center bg-white w-[30vh]'>
              <span className='flex justify-between items-center px-2'>
              <input 
                className='z-[1] text-2xl text-zinc-900 placeholder:font-[Bangers]  w-[100%] focus:outline-none' 
                type='text' 
                placeholder='Search Books'
              />
              <IoSearchCircleSharp className=' text-[40px]' />
              </span>
            </div>
          </div>
        </div>
        <img 
          className='absolute bottom-0 bg-fill bg-center bg-no-repeat' 
          src='/images/middlemarch.png' 
          alt='Middlemarch book'
        />
      </div>
      <br/>
      <div className='text-center'>
        <h1 className='text-purple-800 font-[MyFont] text-4xl border-y-2  mb-5'>
          New Arrivals
        </h1>
      </div>
      {queryData ? (
        <div className=' md:grid-cols-3  grid grid-cols-2 lg:grid-cols-4 px-4 gap-4 py-8 md:m-12 lg:m-12 '>
          {queryData.map((book) => (
            <BookCard key={book.id} id={book.id} {...book.data()}/>
          ))} 
        </div>
      ) : (
        <Loader/>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home