import React, { useState, useEffect } from 'react';
import { usefirebase } from '../../context/Firebase';
import Loader from '../../components/Loader';
import { X } from 'lucide-react';

function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = usefirebase();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await firebase.listAllOrders();
        setOrderData(response.docs);
        console.log("Orders fetched:", response.docs.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [firebase]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {orderData && orderData.length > 0 ? (
        <div className="container mx-auto py-8 px-4 min-h-[50vh]">
          <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderData.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                firebase={firebase} 
                setOrderData={setOrderData} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-[50vh] w-full flex justify-center items-center py-8">
          <span className="flex flex-col justify-center items-center">
            <img 
              src="/images/noOrder.avif" 
              alt="No Order" 
              className="max-w-xs mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold text-gray-700">No orders yet</h1>
          </span>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, firebase, setOrderData }) {
  const [bookData, setBookData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const orderDetails = order.data();

  const fetchBookDetails = async () => {
    try {
      if (orderDetails && orderDetails.bookId) {
        const bookDoc = await firebase.getBookById(orderDetails.bookId);
        if (bookDoc.exists) {
          setBookData(bookDoc.data());
        }
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [orderDetails, firebase]);

  useEffect(() => {
    const fetchImage = async () => {
      if (bookData && bookData.imageURL) {
        try {
          const url = await firebase.getImageUrl(bookData.imageURL);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [bookData, firebase]);

  const handleCancelOrder = (orderId) => {
    const result = confirm('Do you really want to cancel this order?');
    if (result) {
      firebase.cancelOrder(orderId).then(() => {
        // Update the order status locally
        setOrderData((prevData) =>
          prevData.map((order) =>
            order.id === orderId
              ? { ...order, data: () => ({ ...order.data(), status: 'cancelled' }) }
              : order
          )
        );
      }).catch((error) => {
        console.error("Error canceling order:", error);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500">Order information unavailable</p>
        <p className="text-sm text-gray-400">Order ID: {order.id}</p>
      </div>
    );
  }

 return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 h-48">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={bookData.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className="p-4 w-full sm:w-2/3">
          <div className="w-full flex justify-between items-start">
            <h2 className="text-lg font-semibold mb-2 line-clamp-1">{bookData.name}</h2>
            {orderDetails.status !== 'cancelled' && (
              <button 
                onClick={() => handleCancelOrder(order.id)} 
                className="bg-teal-500 text-white p-2 font-semibold rounded-full flex-shrink-0"
              >
                <X color="white" size={16} />
              </button>
            )}
          </div>
          <p className="text-gray-600 mb-1 text-sm sm:text-base">Seller: {bookData.userName}</p>
          <p className="text-gray-600 mb-1 text-sm sm:text-base">Price: Rs {orderDetails.price || bookData.price}</p>
          <p className="text-gray-600 mb-1 text-sm sm:text-base">Quantity: {orderDetails.qty}</p>
          <p className="text-gray-600 mb-1 text-sm sm:text-base">
            Order Date: {orderDetails.orderDate ? new Date(orderDetails.orderDate).toLocaleDateString() : 'N/A'}
          </p>
          <div className="mt-2 sm:mt-3">
            <span className={`px-2 py-1 rounded-full text-xs ${
              orderDetails.status === 'delivered' ? 'bg-green-100 text-green-800' :
              orderDetails.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
              orderDetails.status === 'cancelled' ? 'bg-red-400 text-yellow-100' :
              'bg-blue-100 text-blue-800'
            }`}>
              {orderDetails.status || 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
