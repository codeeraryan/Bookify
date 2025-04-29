import React from 'react'
import { useEffect, useState } from 'react'
import { IoSearchCircleSharp} from "react-icons/io5";
import Loader from '../../components/Loader';
import { usefirebase } from '../../context/Firebase';
import BookCard from '../../components/BookCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Home() {
  const firebase = usefirebase();
  const cartData = useCart();
  const [queryData, SetQueryData] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate();

  const handleSearch = () => {
    const search = queryData.map((book)=>book.data());
     const searchItems= search.filter((book)=>{        
      return book.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim());})
      navigate('/searchResult', { state: { results: searchItems } });  };
  useEffect(() => {
    firebase.listAllBooks().then((response) => {
      SetQueryData(response.docs); 
    })
  }, [])

  return (
    <div className="flex flex-col bg-white min-h-[90vh]">
      <div className="relative bg-cover  md:bg-cover bg-center bg-fixed bg-[url('/images/bookshelf.webp')] h-screen" >
      <div className="text-center pt-40 flex flex-col gap-6 items-center justify-center text-3xl md:text-4xl text-slate-300 px-4">
  <h1 className="text-[60px] md:text-[80px] flex items-baseline font-[Bangers]">
    Bookify
  </h1>
  <p className="text-lg md:text-2xl text-slate-400 max-w-xl">
    Discover your next favorite book. Browse, search, and explore our growing collection.
  </p>
  <div className="flex w-full justify-center items-center max-w-md">
  <div className="overflow-hidden rounded-2xl mt-8 flex items-center bg-white w-[90%] shadow-lg">
    <span className="flex  z-[3] justify-between items-center w-full">
      <input
        className="flex-1  text-xl md:text-2xl text-zinc-900 placeholder:font-[Bangers] focus:outline-none py-2 px-3"
        type="text"
        placeholder="Search Books"
        onChange={(e) => setSearchValue(e.target.value)}
      />

        <IoSearchCircleSharp 
          onClick={handleSearch} 
          className="text-[40px] md:text-[50px] text-zinc-600 cursor-pointer" 
        />
      
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
        <div className='flex justify-center items-center h-screen w-full'>
        <Loader/>
        </div>
      )}
    </div>
  )
}

export default Home