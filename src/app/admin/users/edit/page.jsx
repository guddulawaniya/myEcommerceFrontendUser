"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Sidebar from "../../../dashboard/sidebar/page";
import Header from "../../../dashboard/header/page";

const EditUserPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addresses: [],
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://sheduled-8umy.onrender.com/api/admin/user/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          const { name, email, phone, addresses } = res.data.data;
          setForm({
            name: name || "",
            email: email || "",
            phone: phone || "",
            addresses: addresses || [],
          });
        })
        .catch((err) => console.error("Failed to fetch user", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...form.addresses];
    updatedAddresses[index][field] = value;
    setForm({ ...form, addresses: updatedAddresses });
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [...form.addresses, { type: "", building: "", apartment: "", emirate: "", area: "" }],
    });
  };

  const removeAddress = (index) => {
    const updated = [...form.addresses];
    updated.splice(index, 1);
    setForm({ ...form, addresses: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://sheduled-8umy.onrender.com/api/admin/user/${userId}`, form, {
        withCredentials: true,
      });
      router.push("/admin/users");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Sidebar />
      <div className="relative lg:ml-64">
        <Header />
        <main className="pt-16 px-4">
          <h1 className="text-2xl font-bold mb-4">Edit User</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-2xl">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border px-4 py-2 rounded"
            />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Addresses</h2>
              {form.addresses.map((address, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                  <input
                    type="text"
                    value={address.type || ""}
                    onChange={(e) => handleAddressChange(index, "type", e.target.value)}
                    placeholder="Type"
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={address.building || ""}
                    onChange={(e) => handleAddressChange(index, "building", e.target.value)}
                    placeholder="Building"
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={address.apartment || ""}
                    onChange={(e) => handleAddressChange(index, "apartment", e.target.value)}
                    placeholder="Apartment"
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={address.area || ""}
                    onChange={(e) => handleAddressChange(index, "area", e.target.value)}
                    placeholder="Area"
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    value={address.emirate || ""}
                    onChange={(e) => handleAddressChange(index, "emirate", e.target.value)}
                    placeholder="Emirate"
                    className="border px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-600 hover:underline col-span-2"
                  >
                    Remove Address
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAddress}
                className="text-blue-600 hover:underline"
              >
                + Add Address
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="border border-gray-500 px-6 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditUserPage;