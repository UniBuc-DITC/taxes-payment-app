import { DormFormInput } from "@/types/forms/dorms";
import { AdmissionFormInput, TuitionFormInput } from "@/types/forms/faculties";
import {
  admissionSchema,
  dormsSchema,
  tuitionSchema,
} from "@/utils/forms/validationSchemas";

/**
 * @remarks - These are just palceholders to ilustrate the use of zod and the submit from the forms
 */

export interface FormActionResponse {
  success: boolean;
}
export async function submitAdmission(
  formData: AdmissionFormInput,
): Promise<FormActionResponse> {
  const validate = admissionSchema.safeParse(formData);

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

export async function submitTuition(
  formData: TuitionFormInput,
): Promise<FormActionResponse> {
  const validate = tuitionSchema.safeParse(formData);

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

export async function sumbitDorm(
  formData: DormFormInput,
): Promise<FormActionResponse> {
  const validate = dormsSchema.safeParse(formData);
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
