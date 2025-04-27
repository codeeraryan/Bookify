import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usefirebase } from '../../context/Firebase';
import Loader from '../../components/Loader';

function Detail() {
  const firebase = usefirebase();
  const params = useParams();
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await firebase.placeOrder(qty, params.bookId);
      await firebase.setOrder(result.id);
      setOrderPlaced(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const value = await firebase.getBookById(params.bookId);
        setData(value.data());
        console.log(firebase.user)
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    
    fetchBook();
  }, [firebase, params.bookId]);

  useEffect(() => {
    const fetchImage = async () => {
      if (data) {
        try {
          setIsLoading(true);
          const imageUrl = await firebase.getImageUrl(data.imageURL);
          setUrl(imageUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchImage();
  }, [data, firebase]);

  if (isLoading || data === null) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container h-screen  mx-auto px-4 py-8 ">
      {orderPlaced ? (
        <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-green-700">Thank you for your purchase.</p>
          <img 
          src="/images/orderPlaced.png" 
          alt="Order Placed" 
          className="max-w-xs mx-auto mb-4"
        />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg p-6">
          {/* Book Image Section */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 capitalize">{data.name}</h2>
            <div className="rounded-lg overflow-hidden shadow-md h-80 lg:h-96">
              {url ? (
                <img 
                  src={url} 
                  alt={data.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Image not available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Divider for desktop */}
          <div className="hidden lg:block w-px bg-gray-200 self-stretch"></div>
          
          {/* Book Details Section */}
          <div className="lg:w-1/2 w-full">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Book Details</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Price:</span>
                <span className="text-lg font-bold text-teal-700">Rs {data.price}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">ISBN Number:</span>
                <span className="text-gray-800">{data.isbn}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Seller Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-800 font-medium">{data.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-800">{data.userEmail}</span>
                </div>
              </div>
            </div>
            
            {/* Order Form */}
            <div className="mt-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value) || '')}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-teal-500 focus:border-teal-500 w-24 text-center"
                />
                <button
                  onClick={handlePlaceOrder}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 flex-grow lg:flex-grow-0 lg:w-auto"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;