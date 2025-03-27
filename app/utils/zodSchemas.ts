import { z } from 'zod'
export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    address: z.string().min(10, "Address must be at least 10 characters"),
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, "Invoice name is required!"),
    total: z.number().min(1, "Total is required!"),
    status: z.enum(["PAID", "PENDING"]).default("PENDING"),
    date: z.string().min(1, "Date is required"),
    dueDate: z.number().min(1, "Due days are required!"),
    fromName: z.string().min(1, "Your name is required!"),
    fromEmail: z.string().email("Invalid email!"),
    fromAddress: z.string().min(1, "Your address is required!"),
    clientName: z.string().min(1, "Client's name is required!"),
    clientEmail: z.string().email("Invalid email!"),
    clientAddress: z.string().min(1, "Client's address is required!"),
    currency: z.enum(["INR", "USD", "EUR"]).default("USD"),
    invoiceNumber: z.number().min(1, "Invoice number is required!"),
    note: z.string().optional(),
    invoiceItemDescription: z.string().min(1, "Item description is required!"),
    invoiceItemQuantity: z.number().min(1, "Item quantity is required!"),
    invoiceItemRate: z.number().min(1, "Item rate is required!"),
})