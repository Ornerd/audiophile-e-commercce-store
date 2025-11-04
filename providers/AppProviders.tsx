'use client'

import { CartProvider } from '@/contexts/CartContext'
import { ToastProvider } from '@/contexts/ToastCtx'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { useEffect, useState } from 'react'

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [convexClient, setConvexClient] = useState<ConvexReactClient | null>(null)

  useEffect(() => {
    // This only runs on the client side after hydration
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
    setConvexClient(convex)
  }, [])

  return (
    <ToastProvider>
      <CartProvider>
        {convexClient ? (
          <ConvexProvider client={convexClient}>
            {children}
          </ConvexProvider>
        ) : (
          // During SSR/prerendering, render children without Convex
          children
        )}
      </CartProvider>
    </ToastProvider>
  )
}