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

      // Send confirmation email - FIXED PATH
      const emailResponse = await fetch('/api/send-order-email', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: result.orderNumber,
          customerName: formData.name,
          customerEmail: formData.email,
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
          shipping,
          vat,
          grandTotal,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        }),
      })

      const emailResult = await emailResponse.json()

      // SINGLE toast message - REMOVED DUPLICATE
      if (emailResult.success) {
        showToast(`Order #${result.orderNumber} confirmed! Check your email.`, 'success')
      } else {
        showToast(`Order #${result.orderNumber} confirmed! (Email failed to send)`, 'info')
      }
      
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
        <header className="mb-9 text-[#D87D4A]">
          <Link href={'/'}>Go Back</Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm 
              onSubmit={handleCheckout}
              isSubmitting={isSubmitting}
              onValidationChange={handleFormValidation}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              onCheckout={() => {}}
              isSubmitting={isSubmitting}
              hasFormErrors={hasFormErrors}
            />
          </div>
        </div>
      </div>
    </main>
  )
}