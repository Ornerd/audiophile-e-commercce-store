'use client'
import { CartProvider } from '@/contexts/CartContext'
import { ToastProvider } from '@/contexts/ToastCtx'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

// Initialize Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ToastProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ToastProvider>
    </ConvexProvider>
  )
}