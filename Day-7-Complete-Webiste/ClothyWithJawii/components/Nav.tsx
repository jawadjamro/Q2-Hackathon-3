import Link from 'next/link';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Logo } from './Logo';
import { HeartIcon } from 'lucide-react';
import {  SignedIn, UserButton } from '@clerk/nextjs';

const Nav = () => {
  
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Announcement Bar */}
        <div className="text-sm w-full text-center">
          Sign in and get 20% off your first order.{' '}
          <Link href="/login" className="underline">
            Sign in Now
          </Link>
        </div>
      </div>

      <nav className="bg-white text-black">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold"><Logo/></div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            <li className="hover:text-gray-700">
            <Link href="/products">Shop</Link>
            </li>
            <li className="hover:text-gray-700">
              <Link href="sales">On Sale</Link>
            </li>
            <li className="hover:text-gray-700">
              <Link href="/new">New Arrivals</Link>
            </li>
            <li className="hover:text-gray-700">
              <Link href="/brand">Brands</Link>
            </li>
          </ul>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
           
             <Link href="/cart"><FaShoppingCart className="text-xl cursor-pointer hover:text-gray-700" /></Link>
             <Link href={"/wishlist"}> <HeartIcon/> </Link>
           <SignedIn>
            <UserButton/>
           </SignedIn>
             
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
