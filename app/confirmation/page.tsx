'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Create an interface for the order data
interface OrderData {
  subtotal: number
  shipping: number
  vat: number
  grandTotal: number
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  
  const orderId = searchParams.get('orderId')
  const orderNumber = searchParams.get('orderNumber')

  // Get order data from localStorage before cart is cleared
  useEffect(() => {
    const savedOrderData = localStorage.getItem('lastOrderData')
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData))
      // Clear it after use so it doesn't persist
      localStorage.removeItem('lastOrderData')
    }
  }, [])

  // Use the saved order data or fallback to zeros
  const subtotal = orderData?.subtotal || 0
  const shipping = orderData?.shipping || 50
  const vat = orderData?.vat || 0
  const grandTotal = orderData?.grandTotal || 50

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
          <p className="text-gray-600">Your order has been confirmed and will be shipped soon.</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-bold">{orderNumber || 'ORD-123456'}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Order Items */}
          {orderData?.items && orderData.items.length > 0 && (
            <div className="border-t pt-4 mb-4">
              <h3 className="font-bold mb-2">Items:</h3>
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm mb-1">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT:</span>
              <span>${vat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Grand Total:</span>
              <span>${grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            You will receive an email confirmation shortly. We'll notify you when your order has shipped.
          </p>
          
          <Link 
            href="/"
            className="bg-[#D87D4A] text-white py-3 px-8 rounded-lg font-bold uppercase tracking-wider hover:bg-[#FBAF85] transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}