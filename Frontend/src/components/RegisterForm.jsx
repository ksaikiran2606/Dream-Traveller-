// import React, {useState} from 'react'
// import axios from 'axios';

// const RegisterForm = () => {
//     const [form, setForm] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const [ message, setMessage ] = useState('');
    
//     const handleChange = (e) => {
//         setForm({...form, [e.target.name] : e.target.value});
//     }
   
//     const handleSubmit =  async (e) => {
//         e.preventDefault();
//         try { 
//             await axios.post('http://localhost:8000/register/', form, {headers: {
//                 'Content-Type': 'application/json'
//             }}) ;          
//                 setMessage('Registration successful!');
//         }catch (error) {
//     setMessage('Registration failed. Please try again. ' + (error.response?.data?.username || error.message));
// }

//     }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
//       <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-800 mb-2">Create Account</h1>
//           <p className="text-gray-600">Join BusTravel Express today</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Username</label>
//             <input 
//               type="text" 
//               name="username" 
//               value={form.username} 
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="Choose a username"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email</label>
//             <input 
//               type="email" 
//               name="email" 
//               value={form.email} 
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="Enter your email"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <input 
//               type="password" 
//               name="password" 
//               value={form.password} 
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="Create a password"
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
//           >
//             Register
//           </button>
          
//           {message && (
//             <div className={`mt-4 p-3 rounded-lg text-center ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//               {message}
//             </div>
//           )}
//         </form>
        
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">Already have an account? <a href="#login" className="text-blue-600 hover:underline font-medium">Sign in</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterForm;







import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }
   
    const handleSubmit =  async (e) => {
        e.preventDefault();
        try { 
            await axios.post('http://localhost:8000/register/', form, {headers: {
                'Content-Type': 'application/json'
            }});          
            setMessage('Registration successful! Redirecting to login...');
            
            // Redirect to login after successful registration
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }catch (error) {
            setMessage('Registration failed. Please try again. ' + (error.response?.data?.username || error.message));
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3f极B8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join DreamBus today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input 
              type="text" 
              name="username" 
              value={form.username} 
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2极focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Create a password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>
          
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? 
            <Link to="/login" className="text-blue-600 hover:underline font-medium ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;