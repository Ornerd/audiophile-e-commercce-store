import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="bg-gray-100 min-h-screen flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  )
}

export const dynamic = 'force-dynamic'