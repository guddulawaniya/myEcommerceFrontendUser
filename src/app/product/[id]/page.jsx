'use client'

import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProductDetail({ params }) {
  const router = useRouter()
  
  // fetch this data based on params.id
  const product = {
    id: params.id,
    name: 'Premium Wireless Headphones',
    price: 1999,
    originalPrice: 4999,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.7,
    timeLeft: '12:34:56',
    sold: 78,
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design'
    ],
    colors: ['Black', 'Silver', 'Blue'],
    stock: 15
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
        >
          <FiChevronLeft className="mr-1" />
          Back to deals
        </button>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative h-96 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={18} 
                        className={i < Math.floor(product.rating) ? 'fill-current' : ''} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 ml-2">
                    {product.rating.toFixed(1)} ({product.sold} sold)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-red-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </div>

                <p className="text-gray-700">{product.description}</p>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Features</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Available Colors</h3>
                  <div className="flex space-x-2 mt-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {product.stock > 0 
                      ? `${product.stock} items left in stock` 
                      : 'Out of stock'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center">
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                  <FiHeart className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}