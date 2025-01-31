"use server";
import { redirect } from "next/navigation";

import { ReCAPTCHAResponse } from "@/types/forms/agreements";
import { AccommodationTaxFormData } from "@/types/forms/dorms";
import {
  AdmissionTaxFormData,
  TuitionTaxFormData,
} from "@/types/forms/faculties";
import {
  accomodationTaxSchema,
  admissionTaxFormSchema,
  tuitionTaxFormSchema,
} from "@/utils/forms/validationSchemas";

import { EuPlatescPayment, generateEuPlatescPaymentUrl } from "./euplatesc";

export async function validateReCAPTCHA(token: string): Promise<boolean> {
  console.log("Validating ReCAPTCHA challenge response");
  try {
    const recaptchaQueryUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SERVER}&response=${token}`;
    const response = await fetch(recaptchaQueryUrl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      method: "POST",
    });
    const res: ReCAPTCHAResponse = await response.json();

    // make more actions, if its necessary
    console.log("ReCAPTCHA response:", res);

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
  console.log("Submitting admission tax form");
  const validate = admissionTaxFormSchema.safeParse(formData);

  if (!validate.success) {
    console.log(validate.error);
    //redirect to error page
    return { success: false };
  }
  const { data } = validate;

  if (!prisma) {
    console.error("Prisma client is null!");
    return { success: false };
  }

  const faculty = await prisma.faculty.findUnique({
    include: {
      euPlatescAccount: true,
    },
    where: {
      id: data.facultyId,
    },
  });

  if (!faculty) {
    console.error("Failed to find faculty with ID %d", data.facultyId);
    return { success: false };
  }

  const account = faculty.euPlatescAccount!;

  const paymentData: EuPlatescPayment = {
    account,
    amount: data.amount,
    invoiceId: "1234",
    description: `Plata taxa de admitere ${faculty.nameRo}`,
    billingEmail: data.email,
    billingPhone: data.phoneNumber,
    billingCountry: data.country,
    billingCity: data.city,
    billingAddress: data.address,
  };
  const redirectUrl = generateEuPlatescPaymentUrl(paymentData);

  redirect(redirectUrl);
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

  const { data } = validate;

  if (!prisma) {
    console.error("Prisma client is null!");
    return { success: false };
  }

  const faculty = await prisma.faculty.findUnique({
    include: {
      euPlatescAccount: true,
    },
    where: {
      id: data.facultyId,
    },
  });

  if (!faculty) {
    console.error("Failed to find faculty with ID %d", data.facultyId);
    return { success: false };
  }

  const account = faculty.euPlatescAccount!;

  const paymentData: EuPlatescPayment = {
    account,
    amount: data.amount,
    invoiceId: "1234",
    description: `Plata taxa de studii ${faculty.nameRo}`,
    billingEmail: data.email,
    billingPhone: data.phoneNumber,
    billingCountry: data.country,
    billingCity: data.city,
    billingAddress: data.address,
  };
  const redirectUrl = generateEuPlatescPaymentUrl(paymentData);

  redirect(redirectUrl);
}

export async function submitAccomodationTaxForm(
  formData: AccommodationTaxFormData,
): Promise<FormActionResponse> {
  const validate = accomodationTaxSchema.safeParse(formData);
  if (!validate.success) {
    console.log(validate.error);
    //redirect to error page
    return { success: false };
  }

  const { data } = validate;

  if (!prisma) {
    console.error("Prisma client is null!");
    return { success: false };
  }

  const dorm = await prisma.studentDorm.findUnique({
    include: {
      euPlatescAccount: true,
    },
    where: {
      id: data.dormId,
    },
  });

  if (!dorm) {
    console.error("Failed to find student dorm with ID %d", data.dormId);
    return { success: false };
  }

  const account = dorm.euPlatescAccount!;

  const paymentData: EuPlatescPayment = {
    account,
    amount: data.amount,
    invoiceId: "1234",
    description: `Plata taxa camin ${dorm.name}`,
    billingEmail: data.email,
    billingPhone: data.phoneNumber,
    billingCountry: data.country,
    billingCity: data.city,
    billingAddress: "",
  };
  const redirectUrl = generateEuPlatescPaymentUrl(paymentData);

  redirect(redirectUrl);
}
