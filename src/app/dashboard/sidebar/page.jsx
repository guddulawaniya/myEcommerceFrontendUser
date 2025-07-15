'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Logo from '../../../assets/images/Logo.png'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [expandExperts, setExpandExperts] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Orders', isParent: true },
    { name: 'Delivery Agents', path: '/admin/agents' },
    { name: 'Payments', path: '/admin/payments' },
    { name: 'Logout' }
  ]
  
  const expertSubItems = [
    { name: 'All Orders', path: '/admin/orders' },
    { name: 'Completed Orders', path: '/admin/orders/completed-orders' },
    { name: 'On-Going Orders', path: '/admin//orders/onGoing-orders' },
    { name: 'Pending Orders', path: '/admin//orders/pending-orders' },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-blue-600 text-white"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed h-full bg-white text-blue-800 shadow-lg transition-all duration-300 border-r border-blue-100
        ${mobileMenuOpen ? 'left-0 w-64 z-40' : '-left-full lg:left-0'} 
        ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className="p-4 border-b border-blue-100 flex items-center justify-between">
          {(!collapsed || mobileMenuOpen) && (
            <Image 
              src={Logo} 
              alt="Admin Panel Logo" 
              height={40} 
              width={160} 
              className="object-contain"
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-blue-500 hover:text-blue-700 hidden lg:block"
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              if (item.name === 'Logout') {
                return (
                  <li key="logout">
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors text-blue-600 hover:bg-blue-50 hover:text-blue-700`}
                    >
                      <span className={`${collapsed && !mobileMenuOpen ? 'mx-auto' : 'mr-3'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                        </svg>
                      </span>
                      {(!collapsed || mobileMenuOpen) && <span>Logout</span>}
                    </button>
                  </li>
                )
              }

              if (item.isParent && item.name === 'Experts') {
                return (
                  <li key="Experts">
                    <button
                      onClick={() => setExpandExperts(!expandExperts)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                        pathname.includes('/admin/experts')
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      <span className={`${collapsed && !mobileMenuOpen ? 'mx-auto' : 'mr-3'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      {(!collapsed || mobileMenuOpen) && <span>Experts</span>}
                      {(!collapsed || mobileMenuOpen) && (
                        <svg
                          className={`ml-auto h-4 w-4 transform transition-transform duration-200 ${expandExperts ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>

                    {expandExperts && (!collapsed || mobileMenuOpen) && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {expertSubItems.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.path}
                              className={`block px-4 py-2 text-sm rounded transition-colors ${
                                pathname === sub.path
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      pathname.startsWith(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <span className={`${collapsed && !mobileMenuOpen ? 'mx-auto' : 'mr-3'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {(!collapsed || mobileMenuOpen) && <span>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-blue-100 text-center text-xs text-blue-500">
          {(!collapsed || mobileMenuOpen) ? (
            <>
              <p>v1.0.0</p>
              <p className="mt-1">© {new Date().getFullYear()}</p>
            </>
          ) : (
            <p>v2</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar