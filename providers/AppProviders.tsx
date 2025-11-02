'use client'
import { CartProvider } from '@/contexts/CartContext'
import { ToastProvider } from '@/contexts/ToastCtx'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ToastProvider>
  )
}