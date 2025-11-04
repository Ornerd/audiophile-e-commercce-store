import { mutation } from "./_generated/server";
import { v } from "convex/values";

function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
}

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    shippingZipCode: v.string(),
    shippingCity: v.string(),
    shippingCountry: v.string(),
    paymentMethod: v.string(),
    emoneyNumber: v.optional(v.string()),
    emoneyPin: v.optional(v.string()),
    items: v.array(v.object({
      productId: v.number(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const orderNumber = generateOrderNumber();
    
    const orderId = await ctx.db.insert("orders", {
      ...args,
      orderNumber,
      orderStatus: "pending",
      createdAt: Date.now(),
    });

    return {
      orderId,
      orderNumber,
    };
  },
});