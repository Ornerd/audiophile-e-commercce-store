import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/nodemailer'

interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface ShippingAddress {
  address: string
  city: string
  zipCode: string
  country: string
}

interface EmailRequestBody {
  orderNumber: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  vat: number
  grandTotal: number
  shippingAddress: ShippingAddress
}

export async function POST(request: Request) {
  try {
    const body: EmailRequestBody = await request.json()
    console.log('📧 Nodemailer - Sending to:', body.customerEmail)
    
    // Validate required fields
    if (!body.customerEmail || !body.orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate the items HTML
    const itemsHTML = body.items.map((item: OrderItem) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${item.name} × ${item.quantity}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('')

    const emailHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { 
        font-family: 'Manrope', sans-serif; 
        max-width: 600px; 
        margin: 0 auto; 
        padding: 20px; 
        color: #333; 
        line-height: 1.6;
      }
      .header { 
        background: #000; 
        color: #fff; 
        padding: 30px; 
        text-align: center; 
        border-radius: 8px 8px 0 0;
      }
      .content { 
        background: #fff; 
        padding: 30px; 
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 8px 8px;
      }
      .order-details { 
        background: #f9f9f9; 
        padding: 20px; 
        border-radius: 8px; 
        margin: 20px 0;
      }
      .total { 
        font-size: 18px; 
        font-weight: bold; 
        color: #D87D4A; 
        margin-top: 15px; 
        border-top: 2px solid #ddd;
        padding-top: 10px;
      }
      .footer { 
        text-align: center; 
        color: #666; 
        font-size: 14px; 
        margin-top: 30px; 
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
      .cta-button {
        display: inline-block;
        background: #D87D4A;
        color: white;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        margin: 20px 0;
        text-align: center;
      }
      .cta-button:hover {
        background: #FBAF85;
      }
      table { width: 100%; border-collapse: collapse; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1 style="margin: 0;">🎧 AUDIOPHILE</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${body.customerName},</h2>
      <p>Thank you for your order! We're preparing your items for shipment and will notify you when they're on the way.</p>
      
      <div class="order-details">
        <h3 style="color: #D87D4A; margin-top: 0;">Order #${body.orderNumber}</h3>
        
        <table>
          ${itemsHTML}
        </table>
        
        <div style="margin-top: 20px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Subtotal:</span>
            <span>$${body.subtotal.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Shipping:</span>
            <span>$${body.shipping.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>VAT:</span>
            <span>$${body.vat.toLocaleString()}</span>
          </div>
          <div class="total" style="display: flex; justify-content: space-between;">
            <span>Grand Total:</span>
            <span>$${body.grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <h4>Shipping to:</h4>
        <p>
          ${body.shippingAddress.address}<br>
          ${body.shippingAddress.city}, ${body.shippingAddress.zipCode}<br>
          ${body.shippingAddress.country}
        </p>
      </div>

      <!-- NEW CTA SECTION -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="margin-bottom: 15px; font-size: 16px;">Want to check your order status or view order details?</p>
        <a href="https://audiphilestore.com/confirmation?orderNumber=${body.orderNumber}" class="cta-button">
          View Your Order
        </a>
        <p style="font-size: 14px; color: #666; margin-top: 10px;">
          Or copy this link:https://audiphilestore.com/confirmation?orderNumber=${body.orderNumber}
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>If you have any questions, please contact our support team @ukoorbytal@gmail.com.</p>
      <p>© 2024 Audiophile. All rights reserved.</p>
    </div>
  </body>
  </html>
`

    // Send email using Nodemailer
    const emailResult = await sendEmail({
      to: body.customerEmail,
      subject: `Order #${body.orderNumber} Confirmed`,
      html: emailHTML,
    })

    if (emailResult.success) {
      console.log('Nodemailer - Email sent successfully!')
      return NextResponse.json({ 
        success: true, 
        messageId: emailResult.messageId,
        message: 'Email sent successfully via Nodemailer'
      })
    } else {
      console.error(' Nodemailer - Email failed:', emailResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process email request' },
      { status: 500 }
    )
  }
}

// Keep GET for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Nodemailer API is running. Use POST to send order confirmations.',
    status: 'ready'
  })
}