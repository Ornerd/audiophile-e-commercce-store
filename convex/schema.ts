import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Customer Information
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    
    // Shipping Information
    shippingAddress: v.string(),
    shippingZipCode: v.string(),
    shippingCity: v.string(),
    shippingCountry: v.string(),
    
    // Payment Information
    paymentMethod: v.string(),
    emoneyNumber: v.optional(v.string()),
    emoneyPin: v.optional(v.string()),
    
    // Order Items
    items: v.array(v.object({
      productId: v.number(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    
    // Order Totals
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    
    // Order Metadata
    orderStatus: v.string(),
    orderNumber: v.string(),
    createdAt: v.number(),
  }),
});