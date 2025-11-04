import * as React from 'react';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  shippingAddress: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export const OrderConfirmationEmail: React.FC<Readonly<OrderConfirmationEmailProps>> = ({
  orderNumber,
  customerName,
  items,
  subtotal,
  shipping,
  vat,
  grandTotal,
  shippingAddress,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: '30px', backgroundColor: '#000', padding: '20px' }}>
      <h1 style={{ color: '#fff', margin: 0 }}>AUDIOPHILE</h1>
    </div>

    {/* Greeting */}
    <div style={{ marginBottom: '30px' }}>
      <h2 style={{ color: '#333' }}>Hi {customerName},</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        Thank you for your order! We're getting it ready to be shipped. We'll notify you when it has been sent.
      </p>
    </div>

    {/* Order Summary */}
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3 style={{ color: '#D87D4A', marginBottom: '15px' }}>Order #{orderNumber}</h3>
      
      {/* Order Items */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#333', marginBottom: '10px' }}>Items Ordered</h4>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666' }}>{item.name} × {item.quantity}</span>
            <span style={{ color: '#333', fontWeight: 'bold' }}>${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#666' }}>Subtotal:</span>
          <span style={{ color: '#333' }}>${subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#666' }}>Shipping:</span>
          <span style={{ color: '#333' }}>${shipping.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#666' }}>VAT:</span>
          <span style={{ color: '#333' }}>${vat.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginTop: '10px' }}>
          <span style={{ color: '#D87D4A' }}>Grand Total:</span>
          <span style={{ color: '#D87D4A' }}>${grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>

    {/* Shipping Information */}
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h4 style={{ color: '#333', marginBottom: '10px' }}>Shipping Address</h4>
      <p style={{ color: '#666', margin: 0 }}>
        {shippingAddress.address}<br />
        {shippingAddress.city}, {shippingAddress.zipCode}<br />
        {shippingAddress.country}
      </p>
    </div>

    {/* Footer */}
    <div style={{ textAlign: 'center', color: '#999', fontSize: '14px', marginTop: '30px' }}>
      <p>If you have any questions, contact our customer service team.</p>
      <p>© 2025 Audiophile. All rights reserved.</p>
    </div>
  </div>
);