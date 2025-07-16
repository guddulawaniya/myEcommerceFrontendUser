"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../../../dashboard/sidebar/page";
import Header from "../../../dashboard/header/page";
import { useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiTrash2, FiPlus, FiX, FiChevronDown } from "react-icons/fi";

const CreateUserPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addresses: [{ type: "Home", building: "", apartment: "", emirate: "", area: "", landmark: "", additionalDetails: "" }],
  });

  // Emirates list for dropdown
  const emirates = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah"
  ];

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...form.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setForm({ ...form, addresses: updatedAddresses });
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        { type: "Home", building: "", apartment: "", emirate: "", area: "", landmark: "", additionalDetails: "" },
      ],
    });
  };

  const removeAddress = (index) => {
    if (form.addresses.length > 1) {
      const updated = [...form.addresses];
      updated.splice(index, 1);
      setForm({ ...form, addresses: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      await axios.post("https://sheduled-8umy.onrender.com/api/admin/user", form, {
        withCredentials: true,
      });
      setSuccess("User created successfully!");
      setTimeout(() => router.push("/admin/users"), 1500);
    } catch (err) {
      console.error("Create failed", err);
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

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
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.back()}
                className={`flex items-center px-3 py-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              >
                <FiX className="mr-2" />
                <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>Cancel</span>
              </button>
              <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Create New User
              </h1>
              <div className="w-24"></div> {/* Spacer for alignment */}
            </div>

            {/* Status Messages */}
            {error && (
              <div className={`mb-6 p-4 rounded-lg ${darkMode ? "bg-red-900" : "bg-red-100"}`}>
                <p className={`${darkMode ? "text-red-200" : "text-red-800"}`}>{error}</p>
              </div>
            )}
            {success && (
              <div className={`mb-6 p-4 rounded-lg ${darkMode ? "bg-green-900" : "bg-green-100"}`}>
                <p className={`${darkMode ? "text-green-200" : "text-green-800"}`}>{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={`rounded-lg shadow overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h2 className={`text-lg font-medium mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      icon={<FiUser />}
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      darkMode={darkMode}
                    />
                    <FormField
                      icon={<FiMail />}
                      type="email"
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      darkMode={darkMode}
                    />
                    <FormField
                      icon={<FiPhone />}
                      label="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Addresses
                    </h2>
                    <button
                      type="button"
                      onClick={addAddress}
                      className={`flex items-center px-3 py-1.5 rounded-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                      <FiPlus className="mr-1" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {form.addresses.map((address, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"} relative`}
                      >
                        {form.addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAddress(index)}
                            className={`absolute top-3 right-3 p-1 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                          >
                            <FiTrash2 className={`${darkMode ? "text-red-400" : "text-red-600"}`} />
                          </button>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            icon={<FiMapPin />}
                            label="Address Type"
                            value={address.type}
                            onChange={(e) => handleAddressChange(index, "type", e.target.value)}
                            darkMode={darkMode}
                          />
                          <FormField
                            label="Building"
                            value={address.building}
                            onChange={(e) => handleAddressChange(index, "building", e.target.value)}
                            darkMode={darkMode}
                          />
                          <FormField
                            label="Apartment"
                            value={address.apartment}
                            onChange={(e) => handleAddressChange(index, "apartment", e.target.value)}
                            darkMode={darkMode}
                          />
                          <div className="relative">
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                              Emirate
                            </label>
                            <div className="relative">
                              <select
                                value={address.emirate}
                                onChange={(e) => handleAddressChange(index, "emirate", e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 rounded-md ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"} border focus:ring-blue-500 focus:border-blue-500`}
                              >
                                <option value="">Select Emirate</option>
                                {emirates.map((em) => (
                                  <option key={em} value={em}>{em}</option>
                                ))}
                              </select>
                              <FiMapPin className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            </div>
                          </div>
                          <FormField
                            label="Area"
                            value={address.area}
                            onChange={(e) => handleAddressChange(index, "area", e.target.value)}
                            darkMode={darkMode}
                          />
                          <FormField
                            label="Landmark"
                            value={address.landmark}
                            onChange={(e) => handleAddressChange(index, "landmark", e.target.value)}
                            darkMode={darkMode}
                          />
                          <div className="md:col-span-2">
                            <FormField
                              label="Additional Details"
                              value={address.additionalDetails}
                              onChange={(e) => handleAddressChange(index, "additionalDetails", e.target.value)}
                              darkMode={darkMode}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"} flex justify-end space-x-3`}>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={`px-6 py-2 rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-md ${darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"} text-white flex items-center justify-center min-w-24`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable form field component
const FormField = ({ icon, label, type = "text", name, value, onChange, required = false, darkMode }) => (
  <div>
    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 rounded-md ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"} border focus:ring-blue-500 focus:border-blue-500`}
      />
    </div>
  </div>
);

export default CreateUserPage;