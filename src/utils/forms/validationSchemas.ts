import { z } from "zod";
export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  city: z.string().min(1, "City is required"),
  numericalCode: z
    .string()
    .regex(/^\d+$/, "Numerical code must be only numbers"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Enter a valid email"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only numbers"),
});

export const agreeSchema = z.object({
  agreeToTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
  acceptEuPlatesc: z
    .boolean()
    .refine((val) => val, "You must agree to the euplt"),
});
