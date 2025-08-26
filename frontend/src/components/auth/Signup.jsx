import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/github-svgrepo-com.svg'

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(""); 

    
    console.log("Form submitted!");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold mb-8">
        <image src={Logo} alt="logo" />
      </div>
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
        
        {/* Display the error message if it exists */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-m font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-m font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-m font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 text-center text-m text-gray-600">
        <p>Already Have an account? <Link to="/login" className="font-medium text-blue-900 hover:text-blue-900">Log In</Link></p>
      </div>
    </div>
  );
};

export default Signup;