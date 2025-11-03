'use client'

import { useState } from 'react'
import CheckoutForm from '@/components/forms/CheckoutForm'
import OrderSummary from '@/components/groups/OrderSummary'
import Link from 'next/link'

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckout = async (formData: any) => {
    setIsSubmitting(true)
    console.log('Checkout data:', formData)
    // TODO: Add Convex integration here
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    setIsSubmitting(false)
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="content-wrapper mx-auto px-4  py-35.5">
        {/* Header */}
        <header className="mb-9 text-[#D87D4A]">
          <Link href={'/'}>Go Back</Link>
        </header>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm 
              onSubmit={handleCheckout}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary 
              onCheckout={() => {}} // Form submission is handled by the button's form attribute
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </main>
  )
}