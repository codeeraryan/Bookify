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
import SearchResult from './screens/SearchResult'
import { usefirebase } from './context/Firebase'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const {isLoggedIn}=usefirebase()
  return (
    <div className='flex flex-col min-h-screen'>
      <NavB/>
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/book/view/:bookId" element={<Detail/>}/>
          <Route path="/searchResult" element={<SearchResult/>}/>
          <Route element={<ProtectedRoute />}>
          <Route path="/book/orders" element={<Orders/>}/>
          <Route path='/book/list' element={<AddListing/>}/>
          <Route path="/cart" element={<Cart/>}/>
          </Route>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App

