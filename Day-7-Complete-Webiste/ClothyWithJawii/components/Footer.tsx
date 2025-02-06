import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      {/* Newsletter Section */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-lg font-bold mb-4 md:mb-0">STAY UP TO DATE ABOUT  <br /> OUR LATEST OFFERS</h2>
          <div className="flex w-full md:w-auto items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 rounded-md text-black"
            />
            <button className="bg-white text-black px-4 py-2 rounded-md">Subscribe to Newsletter</button>
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-5 gap-8 px-4">
        {/* Logo and Socials */}
        <div className="md:col-span-1">
          <h1 className="text-xl font-bold">SHOP.CO</h1>
          <p className="text-gray-600 mt-2 mb-4">We have clothes that suit your style and which youre proud to wear. From women to men.</p>
          <div className="flex gap-4 text-gray-600">
            <FaTwitter className="cursor-pointer hover:text-black" />
            <FaFacebookF className="cursor-pointer hover:text-black" />
            <FaInstagram className="cursor-pointer hover:text-black" />
            <FaPinterest className="cursor-pointer hover:text-black" />
          </div>
        </div>

        {/* Footer Links */}
        <div>
          <h3 className="font-bold mb-4">COMPANY</h3>
          <ul className="text-gray-600 space-y-2">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">HELP</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">FAQ</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">RESOURCES</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How-to Blog</li>
            <li>YouTube Playlist</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;