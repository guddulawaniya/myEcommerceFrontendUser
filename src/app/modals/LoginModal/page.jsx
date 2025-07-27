"use client";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import login from "../../../assets/images/login.png";

export default function LoginModal({ onClose, onSwitchToSignUp }) {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
      <div className="relative bg-white w-[90%] max-w-4xl rounded-xl shadow-lg flex overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-red-500"
        >
          <X />
        </button>

        {/* Left Image */}
        <div className="w-1/2 hidden md:block relative">
          <Image
            src={login}
            alt="Login background"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Login</h2>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "customer"
                  ? "bg-purple-600 text-white"
                  : "border border-purple-500 text-purple-600"
              }`}
              onClick={() => setActiveTab("customer")}
            >
              Customer Login
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "corporate"
                  ? "bg-purple-600 text-white"
                  : "border border-purple-500 text-purple-600"
              }`}
              onClick={() => setActiveTab("corporate")}
            >
              Corporate Login
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mobile Number</label>
              <div className="flex border rounded-md overflow-hidden mt-1">
                <span className="bg-gray-100 px-3 flex items-center">+91</span>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  className="w-full px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md mt-1 outline-none"
              />
              <div className="text-right mt-1 text-sm">
                <button type="button" className="text-gray-500 hover:underline">
                  Forgot Password
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToSignUp();
              }}
              className="text-purple-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
