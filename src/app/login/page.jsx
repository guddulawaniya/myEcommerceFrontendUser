'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import logo from '../../assets/images/Logo.png';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/admin/login', { email, password });
     const { data } = res.data;

if (data && data.email === 'admin@sheduled.com') {
  localStorage.setItem('token', data.token);
  router.push('/dashboard');
} else {
  setError('Unauthorized access');
}
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white w-full max-w-md border-t-4 border-blue-500 shadow-xl rounded-lg">
        {/* Compact Header */}
        <div className="px-8 pt-8 pb-2">
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Admin Logo"
              width={160}
              height={60}
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-blue-800 mb-1">ADMIN LOGIN</h1>
          <div className="h-0.5 w-16 bg-blue-500 mx-auto mb-3"></div>
        </div>

        {/* Compact Form */}
        <form onSubmit={handleLogin} className="px-8 pb-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 bg-white text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
              {/* <a href="#" className="text-xs text-blue-500 hover:text-blue-700">Forgot?</a> */}
            </div>
            <input
              type="password"
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 bg-white text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-4 font-bold text-white uppercase tracking-wider text-sm ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>

          {error && (
            <div className="text-center py-2">
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}
        </form>

        {/* Compact Footer */}
        <div className="px-8 py-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">© {new Date().getFullYear()} Sheduled Delivery company</p>
        </div>
      </div>
    </div>
  );
}