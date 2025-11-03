'use client'

import { useState } from 'react'

interface CheckoutFormProps {
  onSubmit: (formData: any) => void
  isSubmitting?: boolean
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  zipCode: string
  city: string
  country: string
  paymentMethod: 'emoney' | 'cash'
  emoneyNumber?: string
  emoneyPin?: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  address?: string
  zipCode?: string
  city?: string
  country?: string
  paymentMethod?: string
  emoneyNumber?: string
  emoneyPin?: string
}

export default function CheckoutForm({ onSubmit, isSubmitting = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'emoney',
    emoneyNumber: '',
    emoneyPin: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handlePaymentMethodChange = (method: 'emoney' | 'cash') => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }))
    // Clear payment method errors
    if (errors.paymentMethod) {
      setErrors(prev => ({
        ...prev,
        paymentMethod: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Billing Details Validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    else if (formData.name.trim() && !/^[a-zA-Z0-9]+$/.test(formData.name)) newErrors.name = "No special characters allowed"
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Wrong format'
   

    // Shipping Info Validation
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'

    // Payment Method Validation
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method'

    // e-Money specific validation
    if (formData.paymentMethod === 'emoney') {
      if (!formData.emoneyNumber?.trim()) newErrors.emoneyNumber = 'e-Money number is required'
      else if (!/^[0-9]{9}$/.test(formData.emoneyNumber)) newErrors.emoneyNumber = 'Must be 9 digits'
      
      if (!formData.emoneyPin?.trim()) newErrors.emoneyPin = 'e-Money PIN is required'
      else if (!/^[0-9]{4}$/.test(formData.emoneyPin)) newErrors.emoneyPin = 'Must be 4 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 md:px-12 md:py-13.5">
      <h2 className="text-2xl font-bold mb-8 uppercase">Checkout</h2>
      
      <form noValidate id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Billing Details Section */}
        <section>
          <h3 className="text-lg font-bold text-[#D87D4A] mb-6">Billing Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.name ? 'text-[#CD2C2C]' : 'text-black'}`}>
                Name
                {errors.name && (
                  <h6 className="text-[#CD2C2C] text-xs">{errors.name}</h6>
                )}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alexei Ward"
                className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                  errors.name ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                }`}
              />
            </div>
            
            {/* Email Address */}
            <div>
              <label htmlFor="email" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.email ? 'text-[#CD2C2C]' : 'text-black'}`}>
                Email Address
                {errors.email && (
                  <h6 className="text-[#CD2C2C] text-xs">{errors.email}</h6>
                )}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alexei@mail.com"
                className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                  errors.email ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                }`}
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.phone ? 'text-[#CD2C2C]' : 'text-black'}`}>
                Phone Number
                {errors.phone && (
                  <h6 className="text-[#CD2C2C] text-xs">{errors.phone}</h6>
                )}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 202-555-0136"
                className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                  errors.phone ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                }`}
              />
            </div>

          </div>

        </section>

        {/* Shipping Info Section */}
        <section>
          <h3 className="text-lg font-bold text-[#D87D4A] mb-6">Shipping Info</h3>
          <div className="space-y-4">
            {/* Address */}
            <div>
              <label htmlFor="address" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.address ? 'text-[#CD2C2C]' : 'text-black'}`}>
                Your Address
                {errors.address && (
                  <h6 className="text-[#CD2C2C] text-xs">{errors.address}</h6>
                )}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="1137 Williams Avenue"
                className={`w-full p-4.5 mb-6 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                  errors.address ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                }`}
              />
            </div>
            
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.zipCode ? 'text-[#CD2C2C]' : 'text-black'}`}>
                  ZIP Code
                  {errors.zipCode && (
                    <h6 className="text-[#CD2C2C] text-xs">{errors.zipCode}</h6>
                  )}
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                    errors.zipCode ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                  }`}
                />
              </div>
              
              {/* City */}
              <div>
                <label htmlFor="city" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.city ? 'text-[#CD2C2C]' : 'text-black'}`}>
                  City
                  {errors.city && (
                    <h6 className="text-[#CD2C2C] text-xs">{errors.city}</h6>
                  )}
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                    errors.city ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                  }`}
                />
              </div>
              
              {/* Country */}
              <div>
                <label htmlFor="country" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.country ? 'text-[#CD2C2C]' : 'text-black'}`}>
                  Country
                  {errors.country && (
                    <h6 className="text-[#CD2C2C] text-xs">{errors.country}</h6>
                  )}
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                    errors.country ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                  }`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Payment Details Section */}
        <section>
          <h3 className="text-lg font-bold text-[#D87D4A] mb-6">Payment Details</h3>
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">

              <label className="md:w-1/3 text-xs font-bold">
                Payment Method
              </label>

              <div className="md:w-2/3 space-y-6">
                {/* e-Money Option */}
                <label className="flex items-center p-4.5 border border-[#D87D4A] rounded-lg cursor-pointer text-sm font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'emoney'}
                    onChange={() => handlePaymentMethodChange('emoney')}
                    className="mr-3 text-[#D87D4A] focus:border-[#D87D4A]"
                  />
                  e-Money
                </label>
                
                {/* Cash on Delivery Option */}
                <label className="flex items-center p-4.5 border border-[#D87D4A] rounded-lg cursor-pointer text-sm font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={() => handlePaymentMethodChange('cash')}
                    className="mr-3 text-[#D87D4A] focus:ring-[#D87D4A]"
                  />
                  Cash on Delivery
                </label>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
                )}
              </div>
            </div>

            {/* Conditional e-Money Fields */}
           {formData.paymentMethod === 'emoney' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* e-Money Number */}
                <div>
                  <label htmlFor="emoneyNumber" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.emoneyNumber ? 'text-[#CD2C2C]' : 'text-black'}`}>
                    e-Money Number
                    {errors.emoneyNumber && (
                      <h6 className="text-[#CD2C2C] text-xs">{errors.emoneyNumber}</h6>
                    )}
                  </label>
                  <input
                    id="emoneyNumber"
                    name="emoneyNumber"
                    type="text"
                    value={formData.emoneyNumber}
                    onChange={handleChange}
                    placeholder="238521993"
                    className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                      errors.emoneyNumber ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                    }`}
                  />
                </div>
                
                {/* e-Money PIN */}
                <div>
                  <label htmlFor="emoneyPin" className={`flex items-center justify-between text-xs font-bold mb-2 ${errors.emoneyPin ? 'text-[#CD2C2C]' : 'text-black'}`}>
                    e-Money PIN
                    {errors.emoneyPin && (
                      <h6 className="text-[#CD2C2C] text-xs">{errors.emoneyPin}</h6>
                    )}
                  </label>
                  <input
                    id="emoneyPin"
                    name="emoneyPin"
                    type="password"
                    value={formData.emoneyPin}
                    onChange={handleChange}
                    placeholder="6891"
                    className={`w-full p-4.5 border rounded-lg focus:outline-none focus:border-[#D87D4A] ${
                      errors.emoneyPin ? 'border-[#CD2C2C] border-2' : 'border-[#CFCFCF]'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Cash on Delivery Message */}
            {formData.paymentMethod === 'cash' && (
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <span className="text-4xl">💰</span>
                <p className="text-gray-600 text-sm">
                  The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                </p>
              </div>
            )}
          </div>
        </section>
      </form>
    </div>
  )
}