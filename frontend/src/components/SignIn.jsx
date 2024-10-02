import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/Axios"; // Ensure axios instance is correctly imported
import {jwtDecode} from "jwt-decode"; // Ensure it's imported properly

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const credential = response.credential; // The Google OAuth token
      console.log("Google Login Success:", credential);
  
      // Send the credential to the backend for validation and login
      const res = await axios.post("/user/google-login", { token: credential });
  
      // Check the backend response for success
      if (res.data.success) {
        console.log("Backend response:", res.data);
        // Redirect to dashboard on success
        navigate("/dashboard");
      } else {
        console.error("Login failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const caallapi = async () => {
    try {
      const data = await axios.get("/"); // Adjust the endpoint as necessary
      console.log("API Response:", data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    caallapi();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Handle regular sign-in logic here, then redirect
    // For example:
    // const res = await axios.post("/user/signin", { email, password });
    // if (res.success) {
    navigate("/dashboard");
  };

  return (
    <GoogleOAuthProvider clientId="229201437595-vfibvgtgaa9s593iq7j0cojom5i5vbpb.apps.googleusercontent.com">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign In
          </h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mb-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Sign In
            </button>

            <div className="flex items-center justify-center">
              <p className="text-gray-600">or</p>
            </div>

            <div className="flex justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                theme="outline"
                size="large"
                shape="rectangular"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
