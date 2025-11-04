'use client'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastCtx'
import CheckoutForm from '@/components/forms/CheckoutForm'
import OrderSummary from '@/components/groups/OrderSummary'
import Link from 'next/link'
import ConfirmationModal from '@/components/modals/ConfirmationModal'

interface OrderData {
  orderNumber: string
  orderId: string
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

export default function CheckoutClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasFormErrors, setHasFormErrors] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  
  // Convex integration - now only runs on client
  const createOrder = useMutation(api.orders.createOrder)
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { showToast } = useToast()

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

      // Prepare order data for Convex
      const orderDataForConvex = {
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
      const result = await createOrder(orderDataForConvex)

      // Send confirmation email
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

      if (emailResult.success) {
        showToast(`Order #${result.orderNumber} confirmed! Check your email.`, 'success')
      } else {
        showToast(`Order #${result.orderNumber} confirmed! (Email failed to send)`, 'info')
      }
      
      // Set order data for confirmation modal
      setOrderData({
        orderNumber: result.orderNumber,
        orderId: result.orderId,
        subtotal,
        shipping,
        vat,
        grandTotal,
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      })
      
      // Clear cart
      clearCart()
      
      // Show confirmation modal instead of redirecting
      setShowConfirmation(true)
      
    } catch (error) {
      console.error('Checkout failed:', error)
      showToast('Checkout failed. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setOrderData(null)
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
              onCheckout={() => {}}
              isSubmitting={isSubmitting}
              hasFormErrors={hasFormErrors}
            />
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && orderData && (
          <ConfirmationModal 
            orderData={orderData}
            onClose={handleCloseConfirmation}
          />
        )}
      </div>
    </main>
  )
}