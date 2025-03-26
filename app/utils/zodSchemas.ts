import { z } from 'zod'
export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    address: z.string().min(10, "Address must be at least 10 characters"),
})