



import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ token, handleLogout, userId, children }) => {
  const logout = () => {
    handleLogout();
  };

  return (
    <div>
      {/* Header / Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Brand Name */}
            <Link to="/" className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21极14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a极 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-800">DreamBus</h1>
                  <p className="text-xs text-gray-500">Travel with Dreams</p>
                </div>
              </div>
            </Link>

            {/* Navigation Links - Show on desktop, hide on mobile */}
            <nav className="hidden md:flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-0">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center transition-colors duration-300"
              >
                Home
              </Link>
              
              <Link 
                to="/buslist" 
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center transition-colors duration-300"
              >
                Available Buses
              </Link>
              
              {token && (
                <Link 
                  to="/my-bookings" 
                  className="text-gray-700 hover:text-blue-600 font-medium flex items-center transition-colors duration-300"
                >
                  My Bookings
                </Link>
              )}
            </nav>

            {/* Login / Logout button and Register */}
            <div className="flex items-center space-x-4">
              {token ? (
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
                    Login
                  </Link>
                  <Link to="/register">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content where routes render */}
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Wrapper;