import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usefirebase } from '../context/Firebase';

function Register() {
  const firebase = usefirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
      alert('Already Logged In');
    }
  }, [navigate, firebase]);
  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(firebase.SignUpUserWithEmailPass(email, password));
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Everything inside the card, including title */}
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
            Sign Up
          </h2>
          
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => firebase.SignInWithGoogle()}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img 
                  className="h-5 w-5 mr-2" 
                  src="/api/placeholder/20/20" 
                  alt="Google logo" 
                />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;