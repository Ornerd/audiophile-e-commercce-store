import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: any
}

// Create transporter with correct method name
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Verify connection
transporter.verify(function (error: any, success: any) {
  if (error) {
    console.error('Email transporter error:', error)
  } else {
    console.log('Email server is ready to send messages')
  }
})

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}