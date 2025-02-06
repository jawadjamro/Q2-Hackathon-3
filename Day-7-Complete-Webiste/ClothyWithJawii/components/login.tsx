

"use client";


import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Login = () => {

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-100">
      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{
        backgroundImage: "url('/login-banner.jpg')",
      }}>
        <div className="flex flex-col items-center justify-center w-full h-full  text-black p-10">
          <h1 className="text-5xl font-bold">Welcome to SHOP.CO</h1>
          <p className="mt-4 text-lg text-center">
            Discover exclusive deals and latest trends!
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 mt-6 flex flex-col justify-center p-8 lg:px-20 bg-white shadow-md">


      <SignedIn>

          <div className="text-center">
           
              <UserButton/>
          
            <h1 className="text-3xl font-bold mt-4">
              Welcome
            </h1>
            <p className="mt-4 text-lg">
              Use coupon <span className="font-bold text-red-500">DISCOUNT111</span> to get a $50 discount on your next order!
            </p>
          </div>
          </SignedIn>

          <SignedOut>

          <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input type="email" placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <input type="password" placeholder="Enter your password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">👁</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-700 text-sm">Remember Me</span>
              </label>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
          <div className="text-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 cursor-pointer">
           
            <SignInButton mode="modal"/>
           

          </div>
          <p className="text-center mt-4 text-gray-600">
            New here? <Link href="#" className="text-red-500 font-bold">Create an account</Link>
          </p>

          </SignedOut>

      </div>
    </div>
  );
};

export default Login;
