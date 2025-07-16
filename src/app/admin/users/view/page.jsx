"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Sidebar from "../../../dashboard/sidebar/page";
import Header from "../../../dashboard/header/page";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiKey, FiCalendar, FiMapPin } from "react-icons/fi";

const ViewUserPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);

    if (userId) {
      setLoading(true);
      axios
        .get(`https://sheduled-8umy.onrender.com/admin/user/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError("Failed to load user data");
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <Sidebar darkMode={darkMode} />
      <div className="relative lg:ml-64">
        <Header darkMode={darkMode} toggleTheme={() => {
          setDarkMode(!darkMode);
          localStorage.setItem("theme", !darkMode ? "dark" : "light");
        }} />
        
        <main className={`pt-16 px-4 sm:px-6 min-h-screen ${darkMode ? "dark:bg-gray-900" : "bg-gray-100"}`}>
          <div className="max-w-4xl mx-auto py-6">
            {/* Back Button and Title */}
            <div className="flex items-center mb-6">
              <Link 
                href="/admin/users" 
                className={`flex items-center mr-4 p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              >
                <FiArrowLeft className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
              </Link>
              <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                User Details
              </h1>
            </div>

            {/* Loading State */}
            {loading && (
              <div className={`p-8 text-center rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading user data...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className={`p-6 rounded-lg ${darkMode ? "bg-red-900" : "bg-red-100"} shadow`}>
                <p className={`${darkMode ? "text-red-200" : "text-red-800"}`}>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className={`mt-3 px-4 py-2 rounded-md ${darkMode ? "bg-red-700 hover:bg-red-600" : "bg-red-600 hover:bg-red-700"} text-white`}
                >
                  Retry
                </button>
              </div>
            )}

            {/* User Data */}
            {user && !loading && (
              <div className={`rounded-lg shadow overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                {/* User Header */}
                <div className={`px-6 py-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${darkMode ? "bg-gray-700" : "bg-blue-100"} mr-4`}>
                      <FiUser className={`text-xl ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                    </div>
                    <div>
                      <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {user.name}
                      </h2>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        User ID: {user._id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Basic Info */}
                  <div className="px-6 py-4">
                    <h3 className={`text-lg font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem 
                        icon={<FiMail />} 
                        label="Email" 
                        value={user.email} 
                        darkMode={darkMode} 
                      />
                      <DetailItem 
                        icon={<FiPhone />} 
                        label="Phone" 
                        value={user.phone || "-"} 
                        darkMode={darkMode} 
                      />
                      <DetailItem 
                        icon={<FiKey />} 
                        label="Google ID" 
                        value={user.googleId || "-"} 
                        darkMode={darkMode} 
                      />
                      <DetailItem 
                        icon={<FiCalendar />} 
                        label="Created At" 
                        value={new Date(user.createdAt).toLocaleString()} 
                        darkMode={darkMode} 
                      />
                      <DetailItem 
                        icon={<FiCalendar />} 
                        label="Updated At" 
                        value={new Date(user.updatedAt).toLocaleString()} 
                        darkMode={darkMode} 
                      />
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="px-6 py-4">
                    <h3 className={`text-lg font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Addresses
                    </h3>
                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {user.addresses.map((addr, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                          >
                            <div className="flex items-start">
                              <FiMapPin className={`mt-1 mr-3 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                              <div>
                                <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                                  {addr.type || "Address"} {index + 1}
                                </h4>
                                <div className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  <p>{addr.building}, {addr.apartment}</p>
                                  <p>{addr.area}, {addr.emirate}</p>
                                  {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                                  {addr.additionalDetails && <p>Details: {addr.additionalDetails}</p>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={`italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No addresses provided
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-end space-x-3`}>
                  <Link
                    href={`/admin/users/edit?id=${user._id}`}
                    className={`px-4 py-2 rounded-md ${darkMode ? "bg-yellow-700 hover:bg-yellow-600" : "bg-yellow-100 hover:bg-yellow-200"} text-yellow-800 dark:text-yellow-200`}
                  >
                    Edit User
                  </Link>
                  <Link
                    href={`/admin/users/delete?id=${user._id}`}
                    className={`px-4 py-2 rounded-md ${darkMode ? "bg-red-700 hover:bg-red-600" : "bg-red-100 hover:bg-red-200"} text-red-800 dark:text-red-200`}
                  >
                    Delete User
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable detail item component
const DetailItem = ({ icon, label, value, darkMode }) => (
  <div className="flex items-start">
    <div className={`p-2 rounded-full mr-3 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </div>
    <div>
      <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </p>
      <p className={`mt-1 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  </div>
);

export default ViewUserPage;