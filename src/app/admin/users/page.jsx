"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../dashboard/sidebar/page";
import Header from "../../dashboard/header/page";
import axios from "axios";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://sheduled-8umy.onrender.com/api/admin/user", {
        withCredentials: true,
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
    
    // Check screen size
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex">
        {/* Sidebar - Responsive Behavior */}
        <div className={`fixed inset-y-0 z-40 w-64 transition-all duration-300 transform ${darkMode ? "dark:bg-gray-800 bg-white" : "bg-white"} shadow-lg ${sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar 
            darkMode={darkMode} 
            toggleTheme={toggleTheme} 
            closeSidebar={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${!isMobile ? 'lg:ml-64' : ''}`}>
          {/* Header */}
          <header className={`sticky top-0 z-30 ${darkMode ? "dark:bg-gray-800 bg-white" : "bg-white"} border-b ${darkMode ? "dark:border-gray-700" : "border-gray-200"} shadow-sm`}>
            <Header 
              darkMode={darkMode} 
              toggleTheme={toggleTheme} 
              toggleSidebar={toggleSidebar}
            />
          </header>

          {/* Page Content */}
          <main className={`p-4 sm:p-6 min-h-screen ${darkMode ? "dark:bg-gray-900" : "bg-gray-100"}`}>
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div>
                  <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    All Users
                  </h1>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Manage your user accounts
                  </p>
                </div>
                <Link
                  href="/admin/users/create"
                  className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-sm text-xs sm:text-sm font-medium ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white transition-colors whitespace-nowrap`}
                >
                  + Add User
                </Link>
              </div>

              {/* Responsive Table Container */}
              <div className={`rounded-lg shadow ${darkMode ? "dark:border-gray-700" : "border border-gray-200"} overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={`${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                      <tr>
                        <th scope="col" className={`px-3 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                          Name
                        </th>
                        <th scope="col" className={`px-3 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                          Email
                        </th>
                        <th scope="col" className={`px-3 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider sm:table-cell hidden`}>
                          Phone
                        </th>
                        <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                      {users.map((user) => (
                        <tr key={user._id} className={`hover:${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                          <td className={`px-3 py-4 whitespace-nowrap text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {user.name}
                          </td>
                          <td className={`px-3 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-500"} overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none`}>
                            {user.email}
                          </td>
                          <td className={`px-3 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-500"} sm:table-cell hidden`}>
                            {user.phone || "N/A"}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2 sm:space-x-4">
                              <Link
                                href={`/admin/users/view/${user._id}`}
                                className={`${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-900"} text-xs sm:text-sm`}
                              >
                                View
                              </Link>
                              <Link
                                href={`/admin/users/edit/${user._id}`}
                                className={`${darkMode ? "text-yellow-400 hover:text-yellow-300" : "text-yellow-600 hover:text-yellow-900"} text-xs sm:text-sm`}
                              >
                                Edit
                              </Link>
                              <Link
                                href={`/admin/users/delete?id=${user._id}`}
                                className={`${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-900"} text-xs sm:text-sm`}
                              >
                                Delete
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Empty State */}
              {users.length === 0 && (
                <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  <p>No users found</p>
                </div>
              )}

              {/* Mobile Phone Column Notice */}
              {isMobile && users.length > 0 && (
                <p className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  * Phone numbers are hidden on mobile view
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;