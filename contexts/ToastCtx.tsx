'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<{ 
    message: string; 
    isVisible: boolean; 
    type: 'success' | 'error' | 'info' 
  } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, isVisible: true, type })
  }

  const hideToast = () => {
    setToast(prev => prev ? { ...prev, isVisible: false } : null)
  }

   useEffect(() => {
    if (toast && toast.isVisible) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3000) // Auto-close after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast UI */}
      {toast && toast.isVisible && (
        <div className="fixed top-4 right-4 w-9/10 md:w-fit z-1000 bg-[#D87D4A] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center gap-3 uppercase font-bold">
            <span>{toast.message}</span>
            <button 
              onClick={hideToast}
              className="text-white hover:text-gray-200 text-lg font-bold"
            >
              x
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}