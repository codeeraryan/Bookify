import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'

import { FirebaseProvider } from './context/Firebase.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <React.StrictMode>
  <BrowserRouter>
  <CartProvider>
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
  </CartProvider>
  </BrowserRouter>
  </React.StrictMode>
  </>,
)
