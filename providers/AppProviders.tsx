'use client'

import { CartProvider } from '@/contexts/CartContext'
import { ToastProvider } from '@/contexts/ToastCtx'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

// Initialize Convex client with fallback for prerendering
let convex: ConvexReactClient | null = null

if (typeof window !== 'undefined') {
  // Only create Convex client on the client side
  convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {convex ? (
        <ConvexProvider client={convex}>
          <ToastProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ToastProvider>
        </ConvexProvider>
      ) : (
        // Fallback during prerendering
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
      )}
    </>
  )
}