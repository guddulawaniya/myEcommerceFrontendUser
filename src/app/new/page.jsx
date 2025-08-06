'use client'

import { useState } from 'react'
import { FiShoppingCart, FiHeart, FiStar, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Navbar from '../components/nav/page'

// Consistent date formatting function
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function NewReleasesPage() {
  // New releases products data
  const newReleases = [
    { 
      id: 1, 
      name: 'Ultra HD Smart TV 55"', 
      price: 54999, 
      originalPrice: 69999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      releaseDate: '2025-07-15',
      features: ['4K Resolution', 'Smart OS', 'Dolby Vision']
    },
    { 
      id: 2, 
      name: 'Foldable Smartphone Pro', 
      price: 89999, 
      originalPrice: 99999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1611791484670-ce19b801d192?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      rating: 4.9,
      releaseDate: '2025-08-01',
      features: ['Foldable OLED', 'Triple Camera', '5G']
    },
    { 
      id: 3, 
      name: 'Wireless Noise Cancelling Headphones', 
      price: 12999, 
      originalPrice: 15999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      rating: 4.7,
      releaseDate: '2025-07-25',
      features: ['40hr Battery', 'ANC', 'Hi-Res Audio']
    },
    { 
      id: 4, 
      name: 'Gaming Laptop RTX 4080', 
      price: 189999, 
      originalPrice: 219999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      rating: 4.9,
      releaseDate: '2025-08-05',
      features: ['i9 Processor', '32GB RAM', '1TB SSD']
    },
    { 
      id: 5, 
      name: 'Smart Mirror Fitness Display', 
      price: 34999, 
      originalPrice: 39999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.5,
      releaseDate: '2025-07-20',
      features: ['AI Trainer', 'Touch Screen', '3D Tracking']
    },
    { 
      id: 6, 
      name: 'Portable Espresso Maker', 
      price: 8999, 
      originalPrice: 9999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1608355024223-9a9139115abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.3,
      releaseDate: '2025-08-03',
      features: ['USB-C Charging', '15bar Pressure', 'Portable']
    },
    { 
      id: 7, 
      name: '360° Camera Drone', 
      price: 45999, 
      originalPrice: 49999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.6,
      releaseDate: '2025-07-28',
      features: ['8K Video', '30min Flight', 'Auto Tracking']
    },
    { 
      id: 8, 
      name: 'E-Reader Pro Max', 
      price: 17999, 
      originalPrice: 19999, 
      isNew: true, 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.4,
      releaseDate: '2025-08-02',
      features: ['10.2" Display', 'Weeks Battery', 'Waterproof']
    }
  ]

  // Categories filter
  const categories = [
    'All Products',
    'Electronics',
    'Home Appliances',
    'Gadgets',
    'Fashion',
    'Accessories'
  ]

  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [sortBy, setSortBy] = useState('Newest')

  // Filter products by category (simplified for demo)
  const filteredProducts = selectedCategory === 'All Products' 
    ? newReleases 
    : newReleases.filter(product => true) // Add actual filtering logic

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.releaseDate) - new Date(a.releaseDate)
    } else if (sortBy === 'Price: High to Low') {
      return b.price - a.price
    } else if (sortBy === 'Price: Low to High') {
      return a.price - b.price
    } else if (sortBy === 'Rating') {
      return b.rating - a.rating
    }
    return 0
  })

  return (
   <>
    <Navbar/>
    <div className="bg-gray-50 pt-26">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-96 w-full bg-gradient-to-r from-purple-900 to-blue-800 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">NEW RELEASES</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover the latest products just added to our collection. Be the first to experience cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm py-4 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Newest</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* New Releases Grid */}
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Product image with new badge */}
                <div className="relative h-60 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                      NEW
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm hover:bg-red-100 hover:text-red-500 transition-colors">
                    <FiHeart size={18} />
                  </button>
                </div>

                {/* Product details */}
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(product.releaseDate)}
                    </span>
                  </div>
                  
                  {/* Features list */}
                  <ul className="mt-2 mb-3 flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price and rating */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <FiShoppingCart className="mr-2" size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Load more button */}
          <div className="flex justify-center mt-10">
            <button className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
              Load More New Releases
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-gray-100 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            <span className="text-blue-600">COMING</span> SOON
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coming soon item 1 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="VR Headset"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-sm text-white/80">Launching September 2025</span>
                    <h3 className="text-xl font-bold text-white mt-1">Next-Gen VR Headset</h3>
                    <button className="mt-3 text-sm font-medium text-white hover:underline">
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Coming soon item 2 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Smartwatch"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-sm text-white/80">Launching October 2025</span>
                    <h3 className="text-xl font-bold text-white mt-1">Health Monitoring Smartwatch</h3>
                    <button className="mt-3 text-sm font-medium text-white hover:underline">
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Coming soon item 3 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Wireless Earbuds"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-sm text-white/80">Launching November 2025</span>
                    <h3 className="text-xl font-bold text-white mt-1">Premium Wireless Earbuds</h3>
                    <button className="mt-3 text-sm font-medium text-white hover:underline">
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-blue-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">STAY UPDATED ON NEW RELEASES</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new product launches, exclusive deals, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

        {/* Footer */}
      <footer className="mt-12 bg-gradient-to-b from-blue-900 to-blue-800 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-white text-blue-600 px-2 py-1 rounded-md mr-2">MK Shopping zone</span>
              <span>STORE</span>
            </h3>
            <p className="text-sm text-blue-200">
              India's fastest growing e-commerce platform with millions of happy customers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Products</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="hover:text-white cursor-pointer">FAQs</li>
              <li className="hover:text-white cursor-pointer">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer">Return Policy</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="hover:text-white cursor-pointer">help@mkshoppingzone.com</li>
              <li className="hover:text-white cursor-pointer">+91 9876543210</li>
              <li className="flex space-x-4 mt-3">
                <span className="bg-blue-700 hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </span>
                <span className="bg-blue-700 hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                  <i className="fab fa-twitter"></i>
                </span>
                <span className="bg-blue-700 hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                  <i className="fab fa-instagram"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-blue-300">
          © 2025 mkshoppingzone. All Rights Reserved.
        </div>
      </footer>
    </div>
   </>
  )
}