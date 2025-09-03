// import React, { useState } from "react";
// import RegisterForm from "./components/RegisterForm";
// import LoginForm from "./components/LoginForm";
// import { Routes, Route } from "react-router-dom";
// import BusList from "./components/BusList";
// import BusSeats from "./components/BusSeats";
// import UserBookings from "./components/UserBookings";
// import Wrapper from "./components/Wrapper";
// import Home from "./components/Home";
// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [userId, setUserId] = useState(localStorage.getItem("userId"));

//   const handleLogin = (token, userId) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userId", userId);
//   };

//   const handleLogout = (token, userId) => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//   };

//   return (
//     <div>
//       <Wrapper handleLogout={handleLogout} token={token}>
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/buslist" element={<BusList />}></Route>
//           <Route path="/register" element={<RegisterForm />}></Route>
//           <Route
//             path="/login"
//             element={<LoginForm onLogin={handleLogin} />}
//           ></Route>
//           <Route
//             path="/bus/:busId"
//             element={<BusSeats token={token} />}
//           ></Route>
//           <Route
//             path="/my-bookings"
//             element={<UserBookings token={token} userId={userId} />}
//           ></Route>
//         </Routes>
//       </Wrapper>
//     </div>
//   );
// };

// export default App;






import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import BusList from './components/BusList'
import BusSeats from './components/BusSeats'
import UserBookings from './components/UserBookings'
import Wrapper from './components/Wrapper'
import Home from "./components/Home"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const navigate = useNavigate()

  useEffect(() => {
    // Check if token exists in localStorage on app load
    const storedToken = localStorage.getItem('token')
    const storedUserId = localStorage.getItem('userId')
    if (storedToken && storedUserId) {
      setToken(storedToken)
      setUserId(storedUserId)
    }
  }, [])

  const handleLogin = (token, userId) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    setToken(token)
    setUserId(userId)
    navigate('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken(null)
    setUserId(null)
    navigate('/')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token
  }

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  }

  return (
    <div>
      <Wrapper handleLogout={handleLogout} token={token} userId={userId}>
        <Routes>
          {/* Home page - accessible to all */}
          <Route path='/' element={<Home />} />
          
          {/* Login page - redirect to home if already logged in */}
          <Route 
            path='/login' 
            element={
              isAuthenticated() ? 
              <Navigate to="/" replace /> : 
              <LoginForm onLogin={handleLogin} />
            } 
          />
          
          {/* Register page - redirect to home if already logged in */}
          <Route 
            path='/register' 
            element={
              isAuthenticated() ? 
              <Navigate to="/" replace /> : 
              <RegisterForm />
            } 
          />
          
          {/* Available buses - protected route */}
          <Route 
            path='/buslist' 
            element={
              <ProtectedRoute>
                <BusList />
              </ProtectedRoute>
            } 
          />
          
          {/* Bus seats - protected route */}
          <Route 
            path='/bus/:busId' 
            element={
              <ProtectedRoute>
                <BusSeats token={token} />
              </ProtectedRoute>
            } 
          />
          
          {/* My bookings - protected route */}
          <Route 
            path='/my-bookings' 
            element={
              <ProtectedRoute>
                <UserBookings token={token} userId={userId} />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Wrapper>
    </div>
  )
}

export default App