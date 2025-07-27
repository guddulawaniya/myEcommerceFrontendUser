import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import img from '../../../assets/images/subscribe.png';

const EmailCouponCard = () => {
  return (
    <div className="max-w-5xl mx-auto my-10 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
      {/* Left Image - completely unchanged from original */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[250px]">
        <Image
          src={img}
          alt="Airplane"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Right Content - modernized */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center text-center p-6 space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Sign Up for <span className="text-blue-600">Exclusive</span> Email Coupons
        </h2>
        
        <div className="w-full max-w-md">
          <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Social Icons */}
        <div className="flex space-x-4 pt-2">
          <a href="#" className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-colors duration-200">
            <FaFacebookF className="text-lg" />
          </a>
          <a href="#" className="p-2 text-blue-700 hover:text-white hover:bg-blue-700 rounded-full transition-colors duration-200">
            <FaLinkedinIn className="text-lg" />
          </a>
          <a href="#" className="p-2 text-blue-500 hover:text-white hover:bg-blue-500 rounded-full transition-colors duration-200">
            <FaTwitter className="text-lg" />
          </a>
          <a href="#" className="p-2 text-pink-500 hover:text-white hover:bg-pink-500 rounded-full transition-colors duration-200">
            <FaInstagram className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailCouponCard;