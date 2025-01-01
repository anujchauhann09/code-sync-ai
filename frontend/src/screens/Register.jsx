import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../config/axios.js';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    axios.post('/users/register', {
        email,
        password
    }).then((res) => {
        console.log(res.data);
        navigate('/');
    }).catch((err) => {
        console.log(err.response.data);
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
