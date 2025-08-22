'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FiSearch, 
  FiShoppingCart, 
  FiUser, 
  FiMenu, 
  FiX,
  FiChevronDown
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../../assets/images/logo.png'
import LoginModal from '../login/page'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' , highlight: true},
    { 
      name: 'Categories', 
      path: '/categories',
      subItems: [
        'Electronics',
        'Fashion',
        'Home & Kitchen',
        'Beauty',
        'Toys & Games'
      ]
    },
    { name: 'Deals', path: '/deals' },
    { name: 'New Releases', path: '/new' },
    { name: 'Customer Service', path: '/support' }
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center h-10"
            >
              <Image 
                src={logo}
                alt="mrigks"
                width={160}
                height={100}
                className="h-[100px] w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Search Bar - Desktop */}
          <motion.div 
            className="hidden md:flex mx-4 flex-1 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full pl-4 pr-12 py-2.5 rounded-sm border border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-sm hover:bg-blue-700 transition-colors">
                <FiSearch size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div whileHover={{ y: -2 }}>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex flex-col items-center text-blue-900 hover:text-blue-600"
              >
                <FiUser size={20} />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/wishlist" className="flex flex-col items-center text-blue-900 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs mt-1">Wishlist</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} className="relative">
              <Link href="/cart" className="flex flex-col items-center text-blue-900 hover:text-blue-600">
                <FiShoppingCart size={20} />
                <span className="text-xs mt-1">Cart</span>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-800 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Bottom Row - Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between mt-2 pb-2">
          <nav className="flex space-x-6">
            {navItems.map((item, index) => (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={item.path}>
                  <motion.div 
                    className={`flex items-center py-2 px-1 ${item.highlight ? 'text-red-600 font-medium' : 'text-gray-800 hover:text-blue-600'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>{item.name}</span>
                    {item.subItems && <FiChevronDown className="ml-1" size={16} />}
                  </motion.div>
                </Link>
                
                {/* Submenu */}
                {item.subItems && (
                  <AnimatePresence>
                    {hoveredItem === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-100"
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <Link key={subIndex} href={`${item.path}/${subItem.toLowerCase().replace(/ /g, '-')}`}>
                            <motion.div 
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              whileHover={{ x: 5 }}
                            >
                              {subItem}
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium cursor-pointer"
            >
              Sell on Mrigks
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
              {/* Mobile Search */}
              <div className="relative mx-2 mb-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-sm border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              
              {/* Mobile Nav Items */}
              {navItems.map((item, index) => (
                <div key={index}>
                  <Link href={item.path}>
                    <motion.div 
                      whileTap={{ scale: 0.98 }}
                      className={`block px-3 py-3 rounded-md text-base font-medium ${item.highlight ? 'text-red-600' : 'text-gray-800'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                  {item.subItems && (
                    <div className="pl-5">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link key={subIndex} href={`${item.path}/${subItem.toLowerCase().replace(/ /g, '-')}`}>
                          <motion.div 
                            whileTap={{ scale: 0.98 }}
                            className="block px-3 py-2 text-sm text-gray-600"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem}
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Account Links */}
              <div className="flex space-x-4 pt-4 px-3 border-t border-gray-200">
                <button 
                  onClick={() => {
                    setIsOpen(false)
                    setIsLoginModalOpen(true)
                  }}
                  className="flex items-center text-blue-800 px-3 py-2 rounded-md bg-blue-50"
                >
                  <FiUser className="mr-2" size={18} />
                  <span>Login/Signup</span>
                </button>
                
                <Link href="/cart">
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-blue-800 px-3 py-2 rounded-md bg-blue-50 relative"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiShoppingCart className="mr-2" size={18} />
                    <span>Cart</span>
                    <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  )
}