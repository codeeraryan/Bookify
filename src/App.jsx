import React from 'react'
import "./input.css"
import { Routes,Route } from 'react-router-dom'
import Register from './screens/Register'
import Login from './screens/Login'
import "./App.css"
import NavB from './components/NavB';
import AddListing from './screens/AddListing';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Orders from './screens/Orders'
import Cart from './screens/Cart'

function App() {
  return (
    <div className='relative  h-full'>
      <NavB/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/book/view/:bookId" element={<Detail/>}/>
      <Route path='/book/list' element={<AddListing/>}/>
      <Route path="/book/orders" element={<Orders/>}/>
      <Route path="/cart" element={<Cart/>}/>
     </Routes>
    </div>
   
  )
}

export default App

