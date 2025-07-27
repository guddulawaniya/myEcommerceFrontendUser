'use client'

import { useState, useEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import b1 from '../../../assets/images/imgg.jpg'


export default function LandingPage() {
  // Hero carousel images
  const heroImages = [
    {b1}, {b1}, {b1}, {b1}
  ]

  // Deal of the day products
  const dealProducts = [
    { id: 1, name: 'Wireless Headphones', price: 1999, originalPrice: 3999, discount: 50, image: '/products/headphones.jpg' },
    { id: 2, name: 'Smart Watch', price: 2499, originalPrice: 4999, discount: 50, image: '/products/smartwatch.jpg' },
    { id: 3, name: 'Bluetooth Speaker', price: 1299, originalPrice: 2599, discount: 50, image: '/products/speaker.jpg' },
    { id: 4, name: 'Fitness Band', price: 1799, originalPrice: 2999, discount: 40, image: '/products/fitnessband.jpg' },
    { id: 5, name: 'Power Bank', price: 899, originalPrice: 1499, discount: 40, image: '/products/powerbank.jpg' }
  ]

  // Top categories
  const categories = [
    { name: 'Electronics', image: '/categories/electronics.jpg' },
    { name: 'Fashion', image: '/categories/fashion.jpg' },
    { name: 'Home & Kitchen', image: '/categories/home.jpg' },
    { name: 'Beauty', image: '/categories/beauty.jpg' },
    { name: 'Toys & Games', image: '/categories/toys.jpg' }
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

  // Deal of the day carousel
  const dealSliderRef = useRef(null)
  const [showDealLeftArrow, setShowDealLeftArrow] = useState(false)
  const [showDealRightArrow, setShowDealRightArrow] = useState(true)

  const scrollDealLeft = () => {
    if (dealSliderRef.current) {
      dealSliderRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollDealRight = () => {
    if (dealSliderRef.current) {
      dealSliderRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const checkDealScroll = () => {
    if (!dealSliderRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = dealSliderRef.current
    setShowDealLeftArrow(scrollLeft > 0)
    setShowDealRightArrow(scrollLeft < scrollWidth - clientWidth)
  }

  useEffect(() => {
    const slider = dealSliderRef.current
    if (slider) {
      slider.addEventListener('scroll', checkDealScroll)
      checkDealScroll()
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkDealScroll)
      }
    }
  }, [])

  return (
    <div className="bg-gray-50 pt-16"> {/* pt-16 to account for fixed navbar */}
      
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
              className={`w-3 h-3 rounded-full ${index === currentHeroIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Deal of the Day */}
      <div className="bg-white shadow-sm mt-4 py-4 px-4 md:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Deal of the Day</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Ends in</span>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
              12:34:56
            </div>
          </div>
        </div>
        
        <div className="relative">
          {showDealLeftArrow && (
            <button
              onClick={scrollDealLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none border border-gray-200"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-gray-700" size={20} />
            </button>
          )}
          
          <div
            ref={dealSliderRef}
            className="overflow-x-auto whitespace-nowrap scrollbar-hide py-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="inline-flex space-x-4">
              {dealProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="w-48 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {showDealRightArrow && (
            <button
              onClick={scrollDealRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none border border-gray-200"
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-gray-700" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Top Categories */}
      <div className="mt-8 px-4 md:px-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <Link href={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}>
                <div className="relative h-32 md:h-40">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-center text-gray-800">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div className="mt-8 bg-white shadow-sm py-4 px-4 md:px-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...dealProducts].reverse().map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Banner */}
      <div className="mt-8 px-4 md:px-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-md"
        >
          <Image
            src="/banners/special-offer.jpg"
            alt="Special Offer"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center pl-8">
            <div className="text-white max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Summer Special Collection</h2>
              <p className="text-sm md:text-base mb-4">Up to 60% off on selected items</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Company</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Policy</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Return Policy</li>
              <li>Terms of Use</li>
              <li>Security</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>help@azurestore.com</li>
              <li>+91 9876543210</li>
              <li>Social Media</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2023 AzureStore. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}