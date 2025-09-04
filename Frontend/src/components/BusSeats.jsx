import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { busId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusesDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios(`https://dream-traveller-backend.onrender.com/buses/${busId}`);
        setBus(response.data);
        setSeats(response.data.seats || []);
      } catch (error) {
        console.log("Error in fetching deatails", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBusesDetails();
  }, [busId]);

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login for booking a seat");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        "https://dream-traveller-backend.onrender.com/booking/",
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert("Booking Seat Successful");
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      );
    } catch (error) {
      alert(error.response?.data?.error || "Booking Failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading bus details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bus Information Card */}
        {bus && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Buses
            </button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{bus.bus_name}</h1>
                <p className="text-gray-600">Bus Number: {bus.number}</p>
              </div>
              <div className="mt-4 md:mt-0 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                <p className="font-semibold">Seat Selection</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Journey Details</h3>
                <div className="flex items-center justify-between mb-5 py-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">{bus.start_time}</div>
                    <div className="text-sm text-gray-500">{bus.origin}</div>
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
                    <div className="text-xl font-bold text-gray-800">{bus.reach_time}</div>
                    <div className="text-sm text-gray-500">{bus.destination}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bus Features</h3>
                <div className="flex flex-wrap gap-2">
                  {bus.features && bus.features.split(',').map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {feature.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seat Layout */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-sm h-8 bg-gray-300 rounded-t-lg flex items-center justify-center relative">
              <div className="absolute w-16 h-4 bg-gray-500 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-700">Driver Cabin</span>
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Booked</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            {seats.map((seat) => {
              const seatNumber = seat.seat_number;
              const row = parseInt(seatNumber.match(/\d+/)[0]);
              const seatLetter = seatNumber.match(/[A-Z]/)[0];
              
              return (
                <div
                  key={seat.id}
                  className={`h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    seat.is_booked
                      ? 'bg-red-100 border border-red-500 cursor-not-allowed' 
                      : 'bg-green-100 border border-green-500 hover:bg-green-200'
                  }`}
                  onClick={() => !seat.is_booked && handleBook(seat.id)}
                >
                  <span className={`font-medium ${seat.is_booked ? 'text-red-700' : 'text-green-700'}`}>
                    {seatNumber}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="w-full max-w-sm h-4 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white">Exit</span>
            </div>
          </div>
        </div>
        
        {/* Booking Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Booking Instructions</h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>Click on an available seat (green) to book it</li>
            <li>Booked seats (red) are not available for selection</li>
            <li>You need to be logged in to book a seat</li>
            <li>Each booking is for a single seat</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusSeats;