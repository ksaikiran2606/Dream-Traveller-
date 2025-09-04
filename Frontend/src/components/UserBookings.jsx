import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchBookings = useCallback(async () => {
    if (!token || !userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setBookingError(null);

      // Add a timeout to prevent hanging requests
      const source = axios.CancelToken.source();
      const timeoutId = setTimeout(() => {
        source.cancel("Request timeout");
      }, 10000); // 10 second timeout

      const response = await axios.get(
        `https://dream-traveller-backend.onrender.com/user/${userId}/bookings/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          cancelToken: source.token,
        }
      );

      clearTimeout(timeoutId);
      console.log("Booking data = ", response.data);
      setBookings(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled:", error.message);
        setBookingError("Request timeout. Please try again.");
      } else {
        console.log("Fetching Details failed", error);
        setBookingError(
          error.response?.data?.message || "Failed to fetch bookings"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Memoize format function
  const formatDateTime = useCallback((dateTimeString) => {
    if (!dateTimeString) return "N/A";
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  }, []);

  // Memoize download function
  const handleDownloadTicket = useCallback(
    (booking) => {
      const ticketContent = `
      BUS TICKET
      ==============
      Booking ID: ${booking.id}
      Passenger: User ${booking.user}
      Bus: ${booking.bus?.bus_name} (${booking.bus?.number})
      Seat: ${booking.seat?.seat_number || "N/A"}
      Booking Time: ${formatDateTime(booking.booking_time)}
      Status: Confirmed
      
      Thank you for traveling with us!
    `;

      const blob = new Blob([ticketContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-${booking.id}.txt`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    },
    [formatDateTime]
  );

  // Memoize cancel function
// Memoize cancel function
const handleCancelBooking = useCallback(async (bookingId) => {
  if (!window.confirm("Are you sure you want to cancel this booking?")) {
    return;
  }

  try {
    setCancellingId(bookingId);

    // ✅ Correct API endpoint (adjust according to your backend routes)
    const response = await axios.delete(
      `https://dream-traveller-backend.onrender.com/booking/${bookingId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.data.message) {
      alert(response.data.message);

      // ✅ Update status in state
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: response.data.status }
            : booking
        )
      );
    }
  } catch (error) {
    if (error.response?.status === 404) {
      alert("Booking not found. It may have already been cancelled.");
    } else if (error.response?.status === 401) {
      alert("Authentication failed. Please log in again.");
    } else {
      console.log("Cancellation failed", error);
      alert(error.response?.data?.error || "Failed to cancel booking");
    }
  } finally {
    setCancellingId(null);
  }
}, [token]);

  // Memoize navigation
  const handleViewDetails = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Loading skeleton for better UX
  const renderSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-24 mt-4 md:mt-0"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="bg-gray-50 p-3 rounded-lg">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="flex space-x-3">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          {renderSkeleton()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">My Bookings</h1>
          <p className="text-gray-600 text-lg">
            Your travel history and upcoming journeys
          </p>
        </div>

        {bookingError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{bookingError}</p>
              </div>
            </div>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-500">
              You haven't made any bookings yet. Start planning your journey!
            </p>
            <button
              onClick={() => navigate("/buslist")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Browse Buses
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {item.bus?.bus_name}
                      </h3>
                      <p className="text-gray-600">
                        Bus No: {item.bus?.number}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Booking ID: {item.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Seat Number</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.seat?.seat_number || "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Booking Time</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDateTime(item.booking_time)}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p
                        className={`text-lg font-semibold ${
                          item.status === "cancelled"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.status || "Confirmed"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      <span className="text-gray-600">
                        User ID: {item.user}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleDownloadTicket(item)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          ></path>
                        </svg>
                        Download Ticket
                      </button>

                      <button
                        onClick={() => handleCancelBooking(item.id)}
                        disabled={
                          cancellingId === item.id ||
                          item.status === "cancelled"
                        }
                        className={`${
                          item.status === "cancelled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        } disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-300`}
                      >
                        {cancellingId === item.id ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            {item.status === "cancelled"
                              ? "Cancelled"
                              : "Cancel Booking"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
