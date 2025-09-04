import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("https://dream-traveller-backend.onrender.com/buses/");
        setBuses(response.data);
      } catch (error) {
        console.log("error in fetching buses", error);
      }
    };
    fetchBuses();
  }, []);

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`);
  };

  // Function to format time to AM/PM format
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = timeString.split(':');
    let hours = parseInt(time[0]);
    const minutes = time[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Available Buses</h1>
          <p className="text-gray-600">Choose from our fleet of comfortable buses</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.bus_name}</h3>
                    <p className="text-gray-500 text-sm">Bus No: {item.number}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {item.features || 'Standard'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-5 py-3 border-t border-b border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{formatTime(item.start_time)}</div>
                    <div className="text-xs text-gray-500">{item.origin}</div>
                  </div>
                  
                  <div className="relative flex-grow mx-4">
                    <div className="h-0.5 bg-gray-300"></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{formatTime(item.reach_time)}</div>
                    <div className="text-xs text-gray-500">{item.destination}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="text-sm font-medium text-gray-700">
                      {(() => {
                        if (!item.start_time || !item.reach_time) return 'N/A';
                        const start = new Date(`2000-01-01T${item.start_time}`);
                        const end = new Date(`2000-01-01T${item.reach_time}`);
                        if (end < start) end.setDate(end.getDate() + 1); // Handle overnight journeys
                        const diffMs = end - start;
                        const hours = Math.floor(diffMs / (1000 * 60 * 60));
                        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                        return `${hours}h ${minutes}m`;
                      })()}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-2xl font-bold text-blue-600">₹{item.price}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4">
                <button 
                  onClick={() => handleViewSeats(item.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  View Seats
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {buses.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No buses available</h3>
            <p className="text-gray-500">Check back later for available buses</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusList;



