"use client";

import {
  AccommodationTaxFormData,
  DormOption,
  DormTaxOption,
  AccommodationTaxFormTexts,
} from "@/types/forms/dorms";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DormTaxesForm from "./DormTaxesForm";
import MonthsForm from "./MonthsForm";
import ConsentToTermsForm from "../reusable/ConsentToTermsForm";
import EuPlatescConsentForm from "../reusable/EuPlatescConsentForm";
import SubmitButton from "../reusable/SubmitButton";
import { submitAccomodationTaxForm } from "@/actions/forms";
import ReCAPTCHAForm from "../reusable/ReCAPTCHAForm";
import BillingDetailsForm from "../reusable/BillingDetailsForm";

/**
 * `AccommodationTaxForm` is a React component for handling the student dorm accommodation tax form.
 *
 * Props:
 * @prop {DormOption[]} dormOptions - An array of `DormOption` objects for student dorm selection.
 * @prop {Record<string, DormTaxOption[]>} taxesOptions - A record mapping student dorm IDs to their corresponding tax options.
 * @prop {RequiredCheckboxTexts} agreeTexts - Texts for the agreement to the terms section of the form.
 * @prop {BillingFormTexts} billingTexts - Texts for the personal details section of the form.
 * @prop {DormsFormTexts} dormTaxesTexts - Texts for the dorm taxes section of the form.
 * @prop {RequiredCheckboxTexts} acceptEuPlatescTexts - Texts for the Eu Platesc acceptance section.
 * @prop {MonthSelectTexts} monthTexts - Texts for the month selection section.
 * @prop {AdmissionFormTexts} submitTexts - Texts for the submit button (submitting or not).
 * @prop {ReCAPTCHATexts} recaptchaTexts - Texts for the reCAPTCHA form.
 *
 * The component integrates: `DormTaxesForm`, `MonthsForm`, `BillingDetailsForm`, `ConsentToTermsForm`,
 * `EuPlatescConsentForm`, and `SubmitButton`.
 *
 * The component uses the `useForm` hook from `react-hook-form` for form handling and validation.
 */

interface Props extends AccommodationTaxFormTexts {
  dormOptions: DormOption[];
  taxesOptions: Record<string, DormTaxOption[]>;
}
export default function AccommodationTaxForm({
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
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    register,
  } = useForm<AccommodationTaxFormData>({
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
      consentEuPlatesc: false,
      dormId: "",
      taxId: "",
      month: "",
      amount: 0,
      recaptcha: "",
    },
  });

  const onSubmit: SubmitHandler<AccommodationTaxFormData> = useCallback(
    async (data) => {
      const r = await submitAccomodationTaxForm(data);
      console.log(r);
    },
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto mt-12 bg-white p-10 shadow-lg rounded-lg space-y-6"
    >
      <div className="md:grid md:grid-cols-2 gap-6 flex flex-col items-center justify-center">
        <DormTaxesForm
          dormOptions={dormOptions}
          taxesOptions={taxesOptions}
          {...dormTaxesTexts}
          control={control}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
        <div className="col-span-2 w-full text-center flex items-center justify-center my-8 md:justify-start">
          <MonthsForm {...monthTexts} control={control} errors={errors} />
        </div>
        <BillingDetailsForm
          {...billingTexts}
          errors={errors}
          register={register}
        />
        <ConsentToTermsForm
          {...agreeTexts}
          errors={errors}
          register={register}
        />
        <EuPlatescConsentForm
          {...acceptEuPlatescTexts}
          errors={errors}
          register={register}
        />
        <ReCAPTCHAForm {...recaptchaTexts} control={control} errors={errors} />
        <div className="col-span-2 w-full text-center flex items-center justify-center">
          <SubmitButton isSubmitting={isSubmitting} {...submitTexts} />
        </div>
      </div>
    </form>
  );
}
