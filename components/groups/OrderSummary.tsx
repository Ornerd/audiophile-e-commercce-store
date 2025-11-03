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
      <h2 className="text-lg font-bold mb-6 uppercase">Summary</h2>

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
                  <h5 className="font-bold text-[0.9375rem] text-black">{item.name.split(' ').filter(word => !["headphones", "speaker", "earphones", "wireless"].includes(word.toLowerCase())).join(' ')}</h5> 
                  <h6 className="text-black opacity-50 font-bold text-sm">
                            ${item.price}
                          </h6>
                </div>
              </div>
              <div className="text-black opacity-50 font-bold">
                x{item.quantity}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-black opacity-50 uppercase">Total</span>
          <span className="font-bold text-lg">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black opacity-50 uppercase">Shipping</span>
          <span className="font-bold text-lg">${shipping}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black opacity-50 uppercase">VAT (included)</span>
          <span className="font-bold text-lg">${vat}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between mb-6">
        <span className="text-black opacity-50 uppercase">Grand Total</span>
        <span className="font-bold text-[#D87D4A] text-lg">${grandTotal}</span>
      </div>

      {/* Continue & Pay Button - Now in OrderSummary */}
      <button 
        type="submit"
        form="checkout-form"
        onClick={onCheckout}
        disabled={isSubmitting || cartItems.length === 0}
        className="w-full bg-[#D87D4A] text-white py-4 px-6 rounded-lg font-bold uppercase tracking-wider hover:bg-[#FBAF85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[0.8125rem]"
      >
        {isSubmitting ? 'Processing...' : 'Continue'}
      </button>
    </div>
  )
}