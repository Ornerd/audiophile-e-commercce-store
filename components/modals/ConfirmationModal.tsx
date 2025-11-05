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
          className="bg-white rounded-lg w-9/10 max-w-[540px] max-h-[80vh] overflow-y-auto"
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
            <div className="bg-gray-50 rounded-lg mb-6 flex md:flex-row fkex-col overflow-hidden">

              <div className='w-full p-6'>
                  {/* Order Items */}
                  {items.length > 0 && (
                      <div className=" pt-4 mb-4">
                      {items.map((item, index) => (
                          index === 0 ?
                          <div key={index} className="flex justify-between text-sm mb-1">
                            <div className='flex flex-col'>

                              <span className='font-bold uppercase text-[0.9375rem]'>{item.name.split(' ').filter(word => !["headphones", "speaker", "earphones", "wireless"].includes(word.toLowerCase())).join(' ')}</span>

                              <span className='text-[0.875rem] font-bold opacity-50 text-black'>${(item.price * item.quantity).toLocaleString()}</span>

                            </div>
                            <div>
                              <span className='text-[0.75rem] font-bold opacity-50 text-black'>x{item.quantity}</span>
                            </div>
                          
                          </div>
                          : ''
                      ))}
                      </div>
                  )}
                  <div className='bg-black opacity-10 w-full h-px'></div>
                  <div className='flex justify-center mt-3'>
                      <span className='text-[0.75rem] font-bold opacity-50 text-black'> and {items.length - 1} other item(s)</span>
                  </div>
              </div>

              <div className="p-6 w-full bg-black">
                <div className="flex flex-col gap-4 pt-2 mt-4 text-white">
                  <h5 className='font-normal text-[0.9375rem] uppercase opacity-50'>Grand Total:</h5>
                  <h4 className="text-white font-bold text-lg ">${grandTotal.toLocaleString()}</h4>
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-11.5 justify-center">
              <Link 
                href="/"
                className="bg-[#D87D4A] text-white py-3 px-8 font-bold uppercase tracking-wider hover:bg-[#FBAF85] transition-colors flex-1 text-center"
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