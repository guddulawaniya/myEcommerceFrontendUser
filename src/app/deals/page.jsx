'use client'

import { useState, useEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart, FiStar, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Navbar from '../components/nav/page'

export default function DealsPage() {
  // Deal products data with free image URLs
  const deals = [
    { 
      id: 1, 
      name: 'Premium Wireless Headphones', 
      price: 1999, 
      originalPrice: 4999, 
      discount: 60, 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.7,
      timeLeft: '12:34:56',
      sold: 78
    },
    { 
      id: 2, 
      name: 'Smart Watch Pro', 
      price: 3499, 
      originalPrice: 6999, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
      rating: 4.5,
      timeLeft: '08:15:42',
      sold: 45
    },
    { 
      id: 3, 
      name: 'Portable Bluetooth Speaker', 
      price: 1299, 
      originalPrice: 2999, 
      discount: 57, 
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
      rating: 4.3,
      timeLeft: '23:59:59',
      sold: 112
    },
    { 
      id: 4, 
      name: 'Advanced Fitness Tracker', 
      price: 1799, 
      originalPrice: 3999, 
      discount: 55, 
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.2,
      timeLeft: '05:30:15',
      sold: 63
    },
    { 
      id: 5, 
      name: 'High Capacity Power Bank', 
      price: 999, 
      originalPrice: 1999, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      rating: 4.4,
      timeLeft: '15:45:30',
      sold: 89
    },
    { 
      id: 6, 
      name: 'Noise Cancelling Earbuds', 
      price: 2499, 
      originalPrice: 4999, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      rating: 4.6,
      timeLeft: '10:20:40',
      sold: 52
    },
    { 
      id: 7, 
      name: '4K Action Camera', 
      price: 5999, 
      originalPrice: 9999, 
      discount: 40, 
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
      rating: 4.8,
      timeLeft: '18:25:10',
      sold: 34
    },
    { 
      id: 8, 
      name: 'Gaming Keyboard & Mouse', 
      price: 1999, 
      originalPrice: 3999, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
      rating: 4.1,
      timeLeft: '07:12:33',
      sold: 41
    }
  ]

  // Categories with free image URLs
  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'Home Appliances', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }
  ]

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 }
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 }
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 }
        } else {
          clearInterval(timer)
          return { hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <>
     <Navbar/>
    <div className="bg-gray-50 pt-40">
      {/* Flash Sale Banner */}
     
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-4 px-4 md:px-8 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <FiClock className="mr-2" size={24} />
            <h2 className="text-xl md:text-2xl font-bold">MEGA DEALS FLASH SALE</h2>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-center">
              <div className="bg-black/30 px-3 py-2 rounded-md font-mono font-bold text-lg">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <span className="text-xs">HOURS</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="text-center">
              <div className="bg-black/30 px-3 py-2 rounded-md font-mono font-bold text-lg">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span className="text-xs">MINS</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="text-center">
              <div className="bg-black/30 px-3 py-2 rounded-md font-mono font-bold text-lg">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <span className="text-xs">SECS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Deals Section */}
      <div className="bg-white shadow-sm mt-4 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-red-600">DAILY</span> DEALS
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden md:block">Ending soon</span>
              <button className="flex items-center text-blue-600 font-medium">
                View All <FiChevronRight className="ml-1" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {deals.slice(0, 4).map((deal) => (
              <motion.div
                key={deal.id}
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden relative flex flex-col"
              >
                {/* Discount badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    {deal.discount}% OFF
                  </span>
                </div>
                
                {/* Time left badge */}
                <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                  {deal.timeLeft}
                </div>
                
                {/* Wishlist button */}
                <button className="absolute top-10 right-2 z-10 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-red-100 hover:text-red-500 transition-colors">
                  <FiHeart size={16} />
                </button>
                
                {/* Product image */}
                <div className="relative h-40 w-full mt-8">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-contain p-4"
                    style={{ objectPosition: 'center' }}
                    unoptimized
                  />
                </div>
                
                {/* Product details */}
                <div className="p-3 pt-0 flex-grow flex flex-col">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{deal.name}</h3>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-red-600">₹{deal.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 line-through ml-2">₹{deal.originalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(deal.rating) ? 'fill-current' : ''} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({deal.rating.toFixed(1)})</span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (deal.sold / 100) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Sold: {deal.sold}</p>
                  </div>
                  
                  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors flex items-center justify-center">
                    <FiShoppingCart className="mr-2" size={16} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* All Deals Section */}
      <div className="bg-gray-50 py-6 px-4 md:px-8 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-600">ALL</span> DEALS
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Discount %</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden relative flex flex-col"
              >
                {/* Discount badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    {deal.discount}% OFF
                  </span>
                </div>
                
                {/* Wishlist button */}
                <button className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-red-100 hover:text-red-500 transition-colors">
                  <FiHeart size={16} />
                </button>
                
                {/* Product image */}
                <div className="relative h-40 w-full mt-6">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-contain p-4"
                    style={{ objectPosition: 'center' }}
                    unoptimized
                  />
                </div>
                
                {/* Product details */}
                <div className="p-3 pt-0 flex-grow flex flex-col">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{deal.name}</h3>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-blue-600">₹{deal.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 line-through ml-2">₹{deal.originalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(deal.rating) ? 'fill-current' : ''} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({deal.rating.toFixed(1)})</span>
                  </div>
                  
                  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors flex items-center justify-center">
                    <FiShoppingCart className="mr-2" size={16} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-bold hover:bg-blue-50 transition-colors">
              Load More Deals
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <span className="text-blue-600">SHOP</span> BY CATEGORY
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group relative rounded-lg overflow-hidden shadow-md h-40 md:h-52"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 py-8 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2">GET THE BEST DEALS FIRST!</h2>
            <p className="text-sm md:text-base">Subscribe to our newsletter for exclusive offers</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-l-md w-full md:w-64 text-gray-800 focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-md font-bold transition-colors">
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