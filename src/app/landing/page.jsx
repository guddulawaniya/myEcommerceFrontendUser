'use client'

import { useState, useEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart, FiStar, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  
  const heroImages = [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80'
  ]

  const products = [
    {  
      id: 1, 
      name: 'Wireless Headphones', 
      price: 1999, 
      originalPrice: 3999, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.5,
      description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.'
    },
    {
      id: 2, 
      name: 'Smart Watch', 
      price: 2499, 
      originalPrice: 4999, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
      rating: 4.2,
      description: 'Feature-rich smartwatch with fitness tracking and notifications.'
    },
    { 
      id: 3, 
      name: 'Bluetooth Speaker', 
      price: 1299, 
      originalPrice: 2599, 
      discount: 50, 
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
      rating: 4.0,
      description: 'Portable Bluetooth speaker with 20W output and 15-hour battery.'
    },
    { 
      id: 4, 
      name: 'Fitness Band', 
      price: 1799, 
      originalPrice: 2999, 
      discount: 40, 
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 3.8,
      description: 'Advanced fitness tracker with heart rate monitoring and sleep analysis.'
    },
    { 
      id: 5, 
      name: 'Power Bank', 
      price: 899, 
      originalPrice: 1499, 
      discount: 40, 
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      rating: 4.1,
      description: '20000mAh power bank with fast charging support.'
    }
  ]

  // Categories with free image URLs
  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    { name: 'Toys & Games', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }
  ]

  // State for hero carousel
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const heroIntervalRef = useRef()

  // Auto-rotate hero carousel
  useEffect(() => {
    heroIntervalRef.current = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroImages.length)
    }, 5000)
    
    return () => clearInterval(heroIntervalRef.current)
  }, [])

  // Handle product click
  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`)
  }

  // Prevent event bubbling when clicking buttons inside product card
  const handleButtonClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="bg-gray-50 pt-26">
      {/* Hero Carousel */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentHeroIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={image}
              alt={`Promotional Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
          </motion.div>
        ))}
        
        {/* Hero Carousel Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                clearInterval(heroIntervalRef.current)
                setCurrentHeroIndex(index)
              }}
              className={`w-3 h-3 rounded-full ${index === currentHeroIndex ? 'bg-blue-600' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 py-3 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <FiClock className="mr-2" size={20} />
            <h2 className="text-lg font-bold">FLASH SALE</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="bg-black/30 px-3 py-1 rounded-md font-mono font-bold">12</div>
              <span className="text-xs">HRS</span>
            </div>
            <div className="text-center">
              <div className="bg-black/30 px-3 py-1 rounded-md font-mono font-bold">34</div>
              <span className="text-xs">MINS</span>
            </div>
            <div className="text-center">
              <div className="bg-black/30 px-3 py-1 rounded-md font-mono font-bold">56</div>
              <span className="text-xs">SECS</span>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-4 py-1 rounded-md text-sm font-bold hover:bg-gray-100 transition-colors">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="bg-white shadow-sm mt-4 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-red-600">HOT</span> DEALS
            </h2>
            <button className="flex items-center text-blue-600 font-medium">
              View All <FiChevronRight className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden relative flex flex-col cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Discount badge with proper spacing */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    {product.discount}% OFF
                  </span>
                </div>
                
                {/* Wishlist button */}
                <button 
                  className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-red-100 hover:text-red-500 transition-colors"
                  onClick={handleButtonClick}
                >
                  <FiHeart size={16} />
                </button>
                
                {/* Product image container with padding to avoid overlap */}
                <div className="relative h-40 w-full mt-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    style={{ objectPosition: 'center' }}
                    unoptimized
                  />
                </div>
                
                {/* Product details */}
                <div className="p-3 pt-0 flex-grow flex flex-col">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(product.rating) ? 'fill-current' : ''} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <span className="text-blue-600">SHOP</span> BY CATEGORY
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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

      {/* Special Offer Banner */}
      <div className="mt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Special Offer"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-red-900/70 flex items-center px-8">
              <div className="text-white max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">SUMMER SALE</h2>
                <p className="text-lg md:text-xl mb-4 font-medium">Up to 60% off on selected items</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-bold hover:bg-gray-100 transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </motion.div>
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
          © 2025 mrigks. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}