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

/**
 * @param tax - the tax id that is selected for that form (FacultyTaxValue or StudentDormTaxValue)
 * @param the - amount that the user selected
 */
export const taxAmountSchema = z.object({
  tax: z.coerce.number().int("Tax must be an integer"),
  amount: z.number().min(100, "Minimum amount value is 100"),
});

/**
 * @param faculty -  the faculty id that is selected from the form
 */
export const admissionSchema = z
  .object({
    faculty: z.coerce.number().int("Faculty must be an integer"), // selected faculty id
  })
  .and(personalSchema)
  .and(agreeSchema)
  .and(taxAmountSchema);
