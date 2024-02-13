import { z } from "zod";
export const billingFormSchema = z.object({
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

export const billingFormSchemaWithoutAddress = billingFormSchema.omit({
  address: true,
});

/**
 * @param recaptcha - the reCAPTCHA token
 */
export const consentFormSchema = z.object({
  consentToTerms: z
    .boolean()
    .refine((val) => val, "You must agree to the terms"),
  consentEuPlatesc: z
    .boolean()
    .refine((val) => val, "You must agree to the euplt"),
  recaptcha: z.string().min(1, "Recaptcha string is missing"),
});

/**
 * @param taxId - the tax id that is selected for that form (FacultyTaxValue or StudentDormTaxValue)
 * @param the - amount that the user selected
 */
export const taxAmountFormSchema = z.object({
  taxId: z.coerce.number().int("Tax must be an integer"),
  amount: z.number().min(100, "Minimum amount value is 100"),
});

export const partialPaySchema = z.object({
  partialPay: z.boolean().optional(),
});

/**
 * @param facultyId -  the faculty id that is selected from the form
 */
export const admissionTaxFormSchema = z
  .object({
    facultyId: z.coerce.number().int("Faculty must be an integer"),
  })
  .and(billingFormSchema)
  .and(consentFormSchema)
  .and(partialPaySchema)
  .and(taxAmountFormSchema);

/**
 * @param didacticPremiumCardOnly -  true if the user selected that he wants to pay with the didactic card
 * @param partialPay - true if it is a partial pay ie amount selected by user is less the the amount of the tax
 */
export const tuitionTaxFormSchema = z
  .object({
    didacticPremiumCardOnly: z.boolean(),
    partialPay: z.boolean(),
  })
  .and(admissionTaxFormSchema);

/**
 * @param dormId -  the student dorm id that is selected from the form
 * @param month - the month number selected in the form in the range of [1,12]
 */
export const accomodationTaxSchema = z
  .object({
    dormId: z.coerce.number().int("Dorm must be an integer"),
    month: z.coerce
      .number()
      .int("Month must be an integer")
      .min(1, "Month shoul be at least 1")
      .max(12, "Month should be at most 12"),
    dormRoomNumber: z
      .number()
      .int("Dorm room number must be an integer")
      .min(1, "Dorm room number should be at least 1"),
  })
  .and(billingFormSchemaWithoutAddress)
  .and(consentFormSchema)
  .and(partialPaySchema)
  .and(taxAmountFormSchema);
