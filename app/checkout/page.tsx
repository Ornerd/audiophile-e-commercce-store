'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastCtx'
import { useRouter } from 'next/navigation'
import CheckoutForm from '@/components/forms/CheckoutForm'
import OrderSummary from '@/components/groups/OrderSummary'
import Link from 'next/link'

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasFormErrors, setHasFormErrors] = useState(false)
  
  // Convex integration
  const createOrder = useMutation(api.orders.createOrder)
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { showToast } = useToast()
  const router = useRouter()

  // Add the missing function
  const handleFormValidation = (hasErrors: boolean) => {
    setHasFormErrors(hasErrors)
  }

  const handleCheckout = async (formData: any) => {
    setIsSubmitting(true)
    
    try {
      // Calculate order totals
      const subtotal = getCartTotal()
      const shipping = 50
      const vat = Math.round(subtotal * 0.2)
      const grandTotal = subtotal + shipping + vat

      // Save order data to localStorage BEFORE clearing cart
    const orderDataToSave = {
      subtotal,
      shipping,
      vat,
      grandTotal,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    }
    localStorage.setItem('lastOrderData', JSON.stringify(orderDataToSave))

      // Prepare order data for Convex
      const orderData = {
        customerName: formData.name,           
        customerEmail: formData.email,           
        customerPhone: formData.phone,       
        shippingAddress: formData.address,     
        shippingZipCode: formData.zipCode,     
        shippingCity: formData.city,           
        shippingCountry: formData.country,     
        
        paymentMethod: formData.paymentMethod,
        emoneyNumber: formData.emoneyNumber,
        emoneyPin: formData.emoneyPin,

        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping,
        vat,
        grandTotal,
      }

      // Create order in Convex
      const result = await createOrder(orderData)
      
      // Show success message
      showToast(`Order #${result.orderNumber} confirmed!`, 'success')
      
      // Clear cart
      clearCart()
      
      // Redirect to confirmation page
      setTimeout(() => {
        router.push(`/confirmation?orderId=${result.orderId}&orderNumber=${result.orderNumber}`)
      }, 1500)
      
    } catch (error) {
      console.error('Checkout failed:', error)
      showToast('Checkout failed. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="content-wrapper mx-auto px-4 py-35.5">
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
              onValidationChange={handleFormValidation}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary 
              onCheckout={() => {}} // Form submission handled by button
              isSubmitting={isSubmitting}
              hasFormErrors={hasFormErrors}
            />
          </div>
        </div>
      </div>
    </main>
  )
}