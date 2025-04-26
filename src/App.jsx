import React from 'react'
import "./input.css"
import { Routes,Route } from 'react-router-dom'

import "./App.css"
import Home from './screens/Home'
import Register from './screens/Authentication/Register'
import Login from './screens/Authentication/Login'
import Detail from './screens/Detail'
import AddListing from './screens/AddListing'
import Orders from './screens/Orders'
import Cart from './screens/Cart'
import NavB from './components/NavBar'
import Footer from './components/Footer'


function App() {
  return (
    <div className='relative '>
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
      <Footer/>
    </div>
   
  )
}

export default App

