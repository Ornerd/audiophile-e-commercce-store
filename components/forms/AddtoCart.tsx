'use client'

import { useState } from 'react'
import ButtonOne from '@/components/buttons/ButtonOne'

interface AddToCartFormProps {
  product: {
    id: number
    slug: string
    name: string
    price: number
    image: {
      mobile: string
      tablet: string
      desktop: string
    }
  }
}

const AddToCart = ({ product }: AddToCartFormProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      setQuantity(value)
    } else if (e.target.value === '') {
      setQuantity(1) // Default to 1 if empty
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you'll add the cart logic later
    const cartItem = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image.desktop,
      quantity: quantity
    }
    
    console.log('Adding to cart:', cartItem)
    // TODO: Add to cart state/context/localStorage
    // TODO: Show success message
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex items-center bg-gray-100 px-0 py-3 w-30 justify-between">
        <button 
          type="button"
          onClick={handleDecrease}
          className="px-2 text-black opacity-25 hover:text-[#D87D4A] hover:opacity-100 transition-colors"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleInputChange}
          className="px-2 font-bold bg-transparent text-center w-16 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-label="Quantity"
        />
        <button 
          type="button"
          onClick={handleIncrease}
          className="px-2 text-black opacity-25 hover:text-[#D87D4A] hover:opacity-100 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      

    <button type="submit" className="w-fit py-[15px] px-[31.5px] bg-[#D87D4A] text-[0.8125rem] cursor-pointer font-bold text-white uppercase tracking-[1px] hover:bg-[#FBAF85]">add to cart</button>

    </form>
  )
}

export default AddToCart