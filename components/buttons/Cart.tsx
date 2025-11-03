'use client'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useState } from 'react'

interface CartProps {
  extraClass: string
}

const Cart = ({ extraClass }: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const itemCount = getCartItemsCount()
  const cartTotal = getCartTotal()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

    const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // Remove item if quantity becomes 0
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: number, productName: string) => {
    if (confirm(`Remove ${productName} from cart?`)) {
      removeFromCart(productId)
    }
  }

  return (
     <div className="relative">
      <button 
        onClick={toggleModal}
        className={`relative cursor-pointer ${extraClass}`}
        aria-label={`Cart, ${itemCount} items`}
      >
        {/* Your existing cart icon */}
        <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#FFF" fillRule="nonzero"/>
        </svg>
        
        {/* Cart item count badge */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#00000065] -z-10"
            onClick={toggleModal}
          />
          
          {/* Modal Content */}
          <div className="fixed top-24 right-4 md:right-8 w-[377px] bg-white rounded-lg shadow-2xl z-50 animate-fade-in">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold uppercase tracking-[1.29px]">
                  Cart ({itemCount})
                </h3>
                <button 
                  onClick={clearCart}
                  className="text-black opacity-50 hover:opacity-100 hover:text-[#D87D4A] text-sm underline"
                  disabled={itemCount === 0}
                >
                  Remove all
                </button>
              </div>

              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto mb-6">
                {cartItems.length === 0 ? (
                  <p className="text-center text-black opacity-50 py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                         <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image.replace('./', '/')}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-lg"
                          />
                          <div>
                            {/* all just to be pixel perfect */}
                            <h5 className="font-bold text-[0.9375rem] text-black">{item.name.split(' ').filter(word => !["headphones", "speaker", "earphones", "wireless"].includes(word.toLowerCase())).join(' ')}</h5> 
                            <h6 className="text-black opacity-50 font-bold text-sm">
                              ${item.price}
                            </h6>
                          </div>
                        </div>
                        
                        {/* Quantity Controls - Similar to AddToCartForm */}
                        <div className="flex items-center bg-gray-100 px-3 py-1">
                          <button 
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-1 text-black opacity-25 hover:text-[#D87D4A] hover:opacity-100 transition-colors text-sm"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 font-bold text-sm min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-1 text-black opacity-25 hover:text-[#D87D4A] hover:opacity-100 transition-colors text-sm"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-8 mb-6">
                <span className="text-black opacity-50 uppercase font-[0.9375rem]">Total</span>
                <span className="text-lg font-bold">${cartTotal}</span>
              </div>

              <div className="space-y-3">
                <Link 
                  href="/"
                  onClick={toggleModal}
                  className="block w-full bg-[#D87D4A] text-white text-center py-3 px-6 font-bold uppercase tracking-wider hover:bg-[#FBAF85] text-[0.8125rem] transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>  
  )
}

export default Cart