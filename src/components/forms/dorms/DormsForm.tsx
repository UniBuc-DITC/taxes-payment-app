"use client";

import {
  DormFormInput,
  DormOption,
  DormTaxOption,
  DormsFormTexts,
} from "@/types/forms/dorms";
import { useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DormTaxesForm from "./DormTaxesForm";
import MonthsForm from "./MonthsForm";
import ConsentToTermsForm from "../reusable/ConsentToTermsForm";
import AgreeEuPlatescForm from "../reusable/AgreeEuPlatesc";
import SubmitButton from "../reusable/SubmitButton";
import { submitDorm } from "@/actions/forms";
import ReCAPTCHAForm from "../reusable/ReCAPTCHAForm";
import BillingDetailsForm from "../reusable/BillingDetailsForm";

/**
 * `DormsForm` is a React component for handling the studnent dorm form.
 *
 * Props:
 * @prop {DormOption[]} dormOptions - An array of `DormOption` objects for student dorm selection.
 * @prop {Record<string, DormTaxOption[]>} taxesOptions - A record mapping student dorm IDs to their corresponding tax options.
 * @prop {MonthOption[]} monthsOptions - Options for selecting a month.
 * @prop {RequiredCheckboxTexts} agreeTexts - Texts for the agreement to the terms section of the form.
 * @prop {BillingFormTexts} billingTexts - Texts for the personal details section of the form.
 * @prop {DormsFormTexts} dormTaxesTexts - Texts for the dorm taxes section of the form.
 * @prop {RequiredCheckboxTexts} acceptEuPlatescTexts - Texts for the Eu Platesc acceptance section.
 * @prop {DormsFormTexts} monthTexts - Texts for the month selection section.
 * @prop {AdmissionFormTexts} submitTexts - Texts for the submit button (submitting or not).
 *
 * The component integrates: `DormTaxesForm`, `MonthsForm`, `BillingDetailsForm`, `AgreeToTermsForm`,
 * `AcceptEuPlatescForm`, and `SubmitButton`.
 *
 * The component uses the `useForm` hook from `react-hook-form` for form handling and validation.
 */

interface Props extends DormsFormTexts {
  dormOptions: DormOption[];
  taxesOptions: Record<string, DormTaxOption[]>;
}
export default function DormsForm({
  dormOptions,
  taxesOptions,
  agreeTexts,
  billingTexts,
  dormTaxesTexts,
  submitTexts,
  acceptEuPlatescTexts,
  monthTexts,
  recaptchaTexts,
}: Props) {
  const methods = useForm<DormFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      numericalCode: "",
      country: "",
      address: "",
      email: "",
      phoneNumber: "",
      consentToTerms: false,
      acceptEuPlatesc: false,
      dormId: "",
      taxId: "",
      month: "",
      amount: 0,
      recaptcha: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<DormFormInput> = useCallback(async (data) => {
    const r = await submitDorm(data);
    console.log(r);
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto mt-12 bg-white p-10 shadow-lg rounded-lg space-y-6"
      >
        <div className="md:grid md:grid-cols-2 gap-6 flex flex-col items-center justify-center">
          <DormTaxesForm
            dormOptions={dormOptions}
            taxesOptions={taxesOptions}
            {...dormTaxesTexts}
          />
          <div className="col-span-2 w-full text-center flex items-center justify-center my-8 md:justify-start">
            <MonthsForm {...monthTexts} />
          </div>
          <BillingDetailsForm {...billingTexts} />
          <ConsentToTermsForm {...agreeTexts} />
          <AgreeEuPlatescForm {...acceptEuPlatescTexts} />
          <ReCAPTCHAForm {...recaptchaTexts} />
          <div className="col-span-2 w-full text-center flex items-center justify-center">
            <SubmitButton isSubmitting={isSubmitting} {...submitTexts} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
