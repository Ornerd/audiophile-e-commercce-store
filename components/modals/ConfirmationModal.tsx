'use client'
import Image from 'next/image'
import Link from 'next/link'
import SuccessIcon from '@/public/assets/checkout/icon-order-confirmation.svg'


interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface OrderData {
  orderNumber: string
  orderId: string
  subtotal: number
  shipping: number
  vat: number
  grandTotal: number
  items: OrderItem[]
}

interface ConfirmationModalProps {
  orderData: OrderData
  onClose: () => void
}

export default function ConfirmationModal({ orderData, onClose }: ConfirmationModalProps) {
  const { orderNumber, subtotal, shipping, vat, grandTotal, items } = orderData

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#00000065] z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div 
          className="bg-white rounded-lg max-w-[540px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-12">
            {/* Success Icon & Header */}
            <div className="text-left mb-8">
              <div className="w-16 h-16flex items-center mb-8">
                <Image src={SuccessIcon} alt='success Icon'/>
              </div>
              <h1 className="text-2xl font-bold mb-8 uppercase">Thank you <br></br> for your order!</h1>
              <p className="text-black opacity-50">You will receive an email confirmation shortly.</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 flex">

              <div className='w-full'>
                  {/* Order Items */}
                  {items.length > 0 && (
                      <div className=" pt-4 mb-4">
                      {items.map((item, index) => (
                          index === 0 ?
                          <div key={index} className="flex justify-between text-sm mb-1">
                            <div className='flex flex-col'>
                              <span>{item.name}</span>
                              <span>${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                            <div>
                              <span>x{item.quantity}</span>
                            </div>
                          
                          </div>
                          : ''
                      ))}
                      </div>
                  )}
                  <hr></hr>
                  <div>
                      {items.length > 0 && (
                        <span> and {items.length - 1} others</span>
                      )}
                  </div>
              </div>

              <div className="pt-4 space-y-2 w-full">
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
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Grand Total:</span>
                  <span className="text-[#D87D4A]">${grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-6">
                You will receive an email confirmation shortly. We'll notify you when your order has shipped.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onClose}
                className="bg-black text-white py-3 px-8 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex-1 text-center"
              >
                Continue Shopping
              </button>
              <Link 
                href="/"
                className="bg-[#D87D4A] text-white py-3 px-8 rounded-lg font-bold uppercase tracking-wider hover:bg-[#FBAF85] transition-colors flex-1 text-center"
              >
                Back to Home
              </Link>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}