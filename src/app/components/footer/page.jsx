import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../../assets/images/logo-bgr.png'
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        {/* Logo & Social */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image src={logo} alt="Safemarg Logo" className="w-28 h-18" />
          </div>
          <div className="flex space-x-4 text-gray-500 text-lg">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

        {/* About the Site */}
        <div>
          <h4 className="font-semibold mb-2">About the Site</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookies Policy</li>
            <li>Disclaimer</li>
            <li>Payment Security</li>
            <li>Booking and Refund Policy</li>
            <li>Feedback</li>
            <li>Contact Us</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Domestic Routes */}
        <div>
          <h4 className="font-semibold mb-2">Popular Domestic Flight Routes</h4>
          <ul className="space-y-1">
            <li>Chennai Mumbai</li>
            <li>Delhi Mumbai</li>
            <li>Mumbai Chennai</li>
            <li>Mumbai Hyderabad</li>
            <li>Bangalore Delhi</li>
            <li>Mumbai Delhi</li>
            <li>Bangalore Mumbai</li>
            <li>Delhi Hyderabad</li>
            <li>Mumbai Bangalore</li>
          </ul>
        </div>

        {/* International Routes */}
        <div>
          <h4 className="font-semibold mb-2">Popular International Flight Routes</h4>
          <ul className="space-y-1">
            <li>Mumbai Bangkok Flights</li>
            <li>Mumbai Dubai Flights</li>
            <li>Mumbai Singapore Flights</li>
            <li>Delhi Dubai Flights</li>
            <li>Delhi Singapore Flights</li>
            <li>Delhi Bangkok Flights</li>
            <li>Chennai Dubai Flights</li>
            <li>Chennai Singapore Flights</li>
            <li>Chennai Bangkok Flights</li>
          </ul>
        </div>

        {/* Airlines */}
        <div>
          <h4 className="font-semibold mb-2">Popular Airlines</h4>
          <ul className="space-y-1">
            <li>Indigo Airlines</li>
            <li>Air India Airlines</li>
            <li>Vistara Airlines</li>
            <li>SpiceJet Airlines</li>
            <li>Air Asia Airlines</li>
            <li>Singapore Airlines</li>
            <li>Thai Airlines</li>
            <li>Malaysia Airlines</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10 border-t pt-4">
        Copyright © 2025 aasycraft, India. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;