"use server";
import { ReCAPTCHAResponse } from "@/types/forms/agreements";
import { DormFormInput } from "@/types/forms/dorms";
import {
  AdmissionTaxFormData,
  TuitionTaxFormData,
} from "@/types/forms/faculties";
import {
  admissionTaxFormSchema,
  dormsTaxSchema,
  tuitionTaxFormSchema,
} from "@/utils/forms/validationSchemas";

export async function validateReCAPTCHA(token: string): Promise<boolean> {
  try {
    console.log("validating");
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SERVER}&response=${token}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      },
    );
    const res: ReCAPTCHAResponse = await response.json();
    // make more actions, if its necessary
    console.log(res);
    return res.success;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * @remarks - These are just placeholders to illustrate the use of zod and the submission from the forms
 */

export interface FormActionResponse {
  success: boolean;
}
export async function submitAdmissionTaxForm(
  formData: AdmissionTaxFormData,
): Promise<FormActionResponse> {
  const validate = admissionTaxFormSchema.safeParse(formData);

  if (!validate.success) {
    console.log(validate.error);
    //redirect to error page
    return { success: false };
  }
  console.log(validate.data);
  // revalidate admin path
  // redirect to success page
  return { success: true };
}

export async function submitTuitionTaxForm(
  formData: TuitionTaxFormData,
): Promise<FormActionResponse> {
  const validate = tuitionTaxFormSchema.safeParse(formData);

  if (!validate.success) {
    console.log(validate.error);
    //redirect to error page
    return { success: false };
  }
  console.log(validate.data);

  // revalidate admin path
  // redirect to success page
  return { success: true };
}

export async function submitDorm(
  formData: DormFormInput,
): Promise<FormActionResponse> {
  const validate = dormsTaxSchema.safeParse(formData);
  if (!validate.success) {
    console.log(validate.error);
    //redirect to error page
    return { success: false };
  }
  console.log(validate.data);

  // revalidate admin path
  // redirect to success page
  return { success: true };
}
