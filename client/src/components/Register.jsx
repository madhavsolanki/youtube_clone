import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';


const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/register', { 
        username, 
        email, 
        password 
      });

      if (data?.success) {
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      console.error('Registration error:', error);
    }finally {
      setLoading(false); // Re-enable button after response
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
             {loading ? "Please wait..." : "Register"} {/* Show loading text */}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">  Login</Link>  
        </p>
      </div>
    </div>
  );
};

export default Register;
