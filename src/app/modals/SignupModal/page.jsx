"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import signup from '../../../assets/images/signup.png';

const SignUpModal = ({ onClose, onSwitchToLogin }) => {
  const [activeTab, setActiveTab] = useState('customer');

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl overflow-hidden shadow-xl flex w-full max-w-4xl"
      >
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <Image
            src={signup}
            alt="Signup Visual"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold">&times;</button>

          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-md font-medium ${activeTab === 'customer' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => handleTabChange('customer')}
            >
              Customer Sign Up
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium ${activeTab === 'corporate' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => handleTabChange('corporate')}
            >
              Corporate Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex gap-2">
              <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded">+91</span>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <input
              type="email"
              placeholder="Enter your email id"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter your Captcha"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="bg-gray-200 px-4 py-2 rounded text-sm font-medium">FFwrw1</div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                className="text-purple-600 font-medium hover:underline"
                onClick={() => {
                  onClose();
                  onSwitchToLogin(); // ✅ trigger login modal
                }}
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpModal;
