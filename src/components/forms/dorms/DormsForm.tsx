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
import PersonalDetailsForm from "../reusable/PersonalDetailsForm";
import AgreeToTermsForm from "../reusable/AgreeToTermsForm";
import AgreeEuPlatescForm from "../reusable/AgreeEuPlatesc";
import SubmitButton from "../reusable/SubmitButton";
import { submitDorm } from "@/actions/forms";
import ReCAPTCHAForm from "../reusable/ReCAPTCHAForm";

/**
 * `DormsForm` is a React component for handling the studnent dorm form.
 *
 * Props:
 * @prop {DormOption[]} dormOptions - An array of `DormOption` objects for student dorm selection.
 * @prop {Record<string, DormTaxOption[]>} taxesOptions - A record mapping student dorm IDs to their corresponding tax options.
 * @prop {MonthOption[]} monthsOptions - Options for selecting a month.
 * @prop {RequiredCheckboxTexts} agreeTexts - Texts for the agreement to the terms section of the form.
 * @prop {PersonalFormTexts} personalTexts - Texts for the personal details section of the form.
 * @prop {DormsFormTexts} dormTaxesTexts - Texts for the dorm taxes section of the form.
 * @prop {RequiredCheckboxTexts} acceptEuPlatescTexts - Texts for the Eu Platesc acceptance section.
 * @prop {DormsFormTexts} monthTexts - Texts for the month selection section.
 * @prop {AdmissionFormTexts} submitTexts - Texts for the submit button (submitting or not).
 *
 * The component integrates: `DormTaxesForm`, `MonthsForm`, `PersonalDetailsForm`, `AgreeToTermsForm`,
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
  personalTexts,
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
      agreeToTerms: false,
      acceptEuPlatesc: false,
      dorm: "",
      tax: "",
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
          <DormTaxesForm<DormFormInput>
            control={control}
            dormOptions={dormOptions}
            taxesOptions={taxesOptions}
            {...dormTaxesTexts}
          />
          <div className="col-span-2 w-full text-center flex items-center justify-center my-8 md:justify-start">
            <MonthsForm<DormFormInput> control={control} {...monthTexts} />
          </div>
          <PersonalDetailsForm {...personalTexts} />
          <AgreeToTermsForm {...agreeTexts} />
          <AgreeEuPlatescForm {...acceptEuPlatescTexts} />
          <ReCAPTCHAForm<DormFormInput> control={control} {...recaptchaTexts} />
          <div className="col-span-2 w-full text-center flex items-center justify-center">
            <SubmitButton isSubmitting={isSubmitting} {...submitTexts} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
