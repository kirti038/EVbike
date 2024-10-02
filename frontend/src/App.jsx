import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import axios from './api/Axios';
import Dashboard from './components/Dashboard';


export const App = () => {
  const [data, setData] = useState(null); // Initialize state to null
  const [error, setError] = useState(null); // State to hold any errors

  const Getdata = async () => {
    try {
      const response = await axios.get("/user/Getdata");
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Render fetched data if available */}
        {data && (
          <Route 
            path="/data" 
            element={<div>{JSON.stringify(data)}</div>} // Example rendering of data
          />
        )}
        {error && <div>{error}</div>} {/* Display error message if any */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
