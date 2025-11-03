'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'

interface OrderSummaryProps {
  onCheckout: () => void
  isSubmitting?: boolean
}

export default function OrderSummary({ onCheckout, isSubmitting = false }: OrderSummaryProps) {
  const { cartItems, getCartTotal, getCartItemsCount } = useCart()
  
  const subtotal = getCartTotal()
  const shipping = 50 // Fixed shipping fee
  const vat = Math.round(subtotal * 0.2) // 20% VAT
  const grandTotal = subtotal + shipping + vat
  const itemCount = getCartItemsCount()

  return (
    <div className="bg-white rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold mb-6">Summary</h2>

      {/* Cart Items List */}
      <div className="space-y-6 mb-8 max-h-60 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-gray-500 text-sm">${item.price}</p>
                </div>
              </div>
              <div className="text-gray-500 font-bold">
                x{item.quantity}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Total</span>
          <span className="font-bold">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Shipping</span>
          <span className="font-bold">${shipping}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">VAT (included)</span>
          <span className="font-bold">${vat}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between mb-6">
        <span className="text-gray-500 uppercase">Grand Total</span>
        <span className="font-bold text-[#D87D4A]">${grandTotal}</span>
      </div>

      {/* Continue & Pay Button - Now in OrderSummary */}
      <button 
        type="submit"
        form="checkout-form"
        onClick={onCheckout}
        disabled={isSubmitting || cartItems.length === 0}
        className="w-full bg-[#D87D4A] text-white py-4 px-6 rounded-lg font-bold uppercase tracking-wider hover:bg-[#FBAF85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Continue & Pay'}
      </button>
    </div>
  )
}