'use client' // This directive must be at the very top

import { useState } from 'react'
import { FiUser, FiLock, FiMail, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  if (typeof window === 'undefined') return null

  return (
    <div className='text-red'>Hiiii I am support</div>
  )
}
