import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';

// Check if API key exists
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

interface SendOrderConfirmationParams {
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

export async function sendOrderConfirmation(params: SendOrderConfirmationParams) {
  console.log('📧 [DEV MODE] Email would be sent to:', params.customerEmail)
  // If no API key, log and return success (for development)
  if (!resend) {
    console.log('📧 [DEV MODE] Email would be sent:', {
      to: params.customerEmail,
      subject: `Order Confirmation #${params.orderNumber}`,
    });
    return { success: true, data: { id: 'dev-mode' } };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: params.customerEmail,
      subject: `Order Confirmation #${params.orderNumber}`,
      react: OrderConfirmationEmail(params),
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}