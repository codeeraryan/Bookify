import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function Cart() {
  const cartData = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  
  useEffect(() => {
    // Calculate total price and platform fee
    const calculateTotals = () => {
      const itemsTotal = cartData.cart.reduce((total, item) => total + parseInt(item.price), 0);
      setTotalPrice(itemsTotal);
      setPlatformFee((itemsTotal * 0.02).toFixed(2)); // 2% platform fee
    };
    
    calculateTotals();
  }, [cartData.cart]);

  const handleRemoveItem=(item)=>{
    const newCart = cartData.cart.filter(elem=>elem.id!=item.id)
     cartData.setCart(newCart); 
     console.log(newCart);
            
  }

  // Function to format price with rupee currency
  const formatPrice = (price) => {
    return `Rs ${Number(price).toFixed(2)}`;
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3">
            {cartData.cart.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-slate-200 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Cart Items ({cartData.cart.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartData.cart.map((item, index) => (
                    <div key={index} className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                      {/* Product Image */}
                      <div className="w-full md:w-1/4 flex-shrink-0">
                        <img 
                          src={cartData.url[index]} 
                          alt={item.name}
                          className="h-40 w-full object-cover rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="w-full md:w-2/4 flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          Seller: <span className="text-gray-800">{item.userName}</span>
                        </p>
                        <p className="text-lg font-medium text-blue-600">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end gap-3">
                        <button onClick={()=>handleRemoveItem(item)} className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                          <ShoppingBag size={16} />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <img 
                  src="/images/emptyCart.webp" 
                  alt="Empty Cart" 
                  className="max-w-xs mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added any books to your cart yet.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
                  Browse Books
                </button>
              </div>
            )}
          </div>
          
          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md sticky top-8">
              <div className="p-4 bg-slate-200 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Number of Books:</span>
                    <span className="font-medium">{cartData.cart.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee (2%):</span>
                    <span className="text-green-600 font-medium">{formatPrice(platformFee)}</span>
                  </div>
                  
                  <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">{formatPrice(Number(totalPrice) + Number(platformFee))}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including taxes and platform fees</p>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md mt-6 transition-colors flex items-center justify-center gap-2"
                  disabled={cartData.cart.length === 0}
                >
                  <ShoppingBag size={18} />
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-xs text-center text-gray-500">
                  <p>Secure checkout powered by BookiFy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;