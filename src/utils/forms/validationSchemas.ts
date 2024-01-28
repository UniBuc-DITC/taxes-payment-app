import { z } from "zod";
export const billingSchema = z.object({
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
/**
 * @param recaptcha - the reCAPTCHA token
 */
export const agreeSchema = z.object({
  consentToTerms: z
    .boolean()
    .refine((val) => val, "You must agree to the terms"),
  acceptEuPlatesc: z
    .boolean()
    .refine((val) => val, "You must agree to the euplt"),
  recaptcha: z.string().min(1, "Recaptcha string is missing"),
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
  .and(billingSchema)
  .and(agreeSchema)
  .and(taxAmountSchema);

/**
 * @param didacticPremiumCardOnly -  true if the user selected that he wants to pay with the didactic card
 * @param partialPay - true if it is a partial pay ie amount selected by user is less the the amount of the tax
 */
export const tuitionSchema = z
  .object({
    didacticPremiumCardOnly: z.boolean(),
    partialPay: z.boolean(),
  })
  .and(admissionSchema);

/**
 * @param drom -  the student dorm id that is selected from the form
 * @param month - the month number selected in the form in the range of [1,12]
 */
export const dormsSchema = z
  .object({
    dorm: z.coerce.number().int("Dorm must be an integer"), // selected dorm id
    month: z.coerce
      .number()
      .int("Month must be an integer")
      .min(1, "Month shoul be at least 1")
      .max(12, "Month should be at most 12"),
  })
  .and(billingSchema)
  .and(agreeSchema)
  .and(taxAmountSchema);
