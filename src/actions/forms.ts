import { AdmissionFormInput } from "@/types/forms/faculties";
import { admissionSchema } from "@/utils/forms/validationSchemas";

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
