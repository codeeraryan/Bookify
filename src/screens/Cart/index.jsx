import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { usefirebase } from '../../context/Firebase';
import Loader from '../../components/Loader';

function Cart() {
  const firebase = usefirebase();
  const cartData = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await firebase.listAllCartItems();
        cartData.setResult(response.docs);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } 
    };

    fetchCart();
  }, [firebase, cartData]);

  // Calculate total price and platform fee
  useEffect(() => {
    if (cartData.result && cartData.result.length > 0) {
      // We need to sum up prices from book data
      let total = 0;
      
      // Use a counter to track when all book data has been fetched
      let processedItems = 0;
      
      cartData.result.forEach(async (item) => {
        const cartItem = item.data();
        if (cartItem && cartItem.bookId) {
          try {
            const bookDoc = await firebase.getBookById(cartItem.bookId);
            if (bookDoc.exists) {
              const bookData = bookDoc.data();
              if (bookData && bookData.price) {
                total += parseInt(bookData.price);
              }
            }
          } catch (error) {
            console.error("Error fetching price:", error);
          } finally {
            processedItems++;
            setIsLoading(false);
            // When all items are processed, update the state
            if (processedItems === cartData.result.length) {
              setTotalPrice(total);
              setPlatformFee((total * 0.02).toFixed(2)); // 2% platform fee
            }
          }
        }
      });
    } else {
      setTotalPrice(0);
      setPlatformFee(0);
    }
  }, [cartData.result, firebase]);

  // Function to format price with rupee currency
  const formatPrice = (price) => {
    return `Rs ${Number(price).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3">
            {cartData.result && cartData.result.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-slate-200 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Cart Items ({cartData.result.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartData.result.map((item) => (
                    <CartItems key={item.id} item={item} firebase={firebase} formatPrice={formatPrice} />
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
            <div className="bg-white rounded-lg shadow-md ">
              <div className="p-4 bg-slate-200 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Number of Books:</span>
                    <span className="font-medium">{cartData.result ? cartData.result.length : 0}</span>
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
                  disabled={!cartData.result || cartData.result.length === 0}
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

const CartItems = ({ item, firebase, formatPrice }) => {
  const [bookData, setBookData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const cartData = useCart();
  
  const cartDetails = item.data();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (cartDetails && cartDetails.bookId) {
          const bookDoc = await firebase.getBookById(cartDetails.bookId);
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

    fetchBookDetails();
  }, [cartDetails, firebase]);

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

  const handleRemoveItem = async (item) => {
    try {
      // First remove from Firebase if needed
      await firebase.removeFromCart(item.id);
      
      // Then update local state by filtering out the removed item
      const newResult = cartData.result.filter(elem => elem.id !== item.id);
      cartData.setResult(newResult);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
      {/* Product Image */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={bookData?.name || "Book"}
          className="h-40 w-full object-cover rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
        />
      </div>
      
      {/* Product Details */}
      <div className="w-full md:w-2/4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
          {bookData?.name || "Book Title"}
        </h3>
        <p className="text-gray-600">
          Seller: <span className="text-gray-800">{bookData?.userName || "Unknown Seller"}</span>
        </p>
        <p className="text-lg font-medium text-blue-600">
          {bookData?.price ? formatPrice(bookData.price) : "Price unavailable"}
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end gap-3">
        <button onClick={() => handleRemoveItem(item)} className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors">
          <Trash2 size={16} />
          <span>Remove</span>
        </button>
        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          <ShoppingBag size={16} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;