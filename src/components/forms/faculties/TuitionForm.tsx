"use client";

import {
  FacultyOption,
  FacultyTaxOption,
  TuitionFormInput,
  TuitionFormTexts,
} from "@/types/forms/faculties";
import { useCallback, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FacultyTaxesForm from "./FacultyTaxesForm";
import { StudyCycle } from "@prisma/client";
import DidacticCardForm from "./DidacticCardForm";
import AmountForm from "./AmountForm";
import AgreeEuPlatescForm from "../reusable/AgreeEuPlatesc";
import AgreeToTermsForm from "../reusable/AgreeToTermsForm";
import SubmitButton from "../reusable/SubmitButton";
import { submitTuition } from "@/actions/forms";
import ReCAPTCHAForm from "../reusable/ReCAPTCHAForm";
import BillingDetailsForm from "../reusable/BillingDetailsForm";

/**
 * `TuitionForm` is a React component for managing and submitting admission forms.
 *
 * Props:
 * @prop {FacultyOption[]} facultyOptions - Options for selecting a faculty.
 * @prop {Record<string, FacultyTaxOption[]>} taxesOptions - Tax options for each faculty.
 * @prop {RequiredCheckboxTexts} agreeTexts - Texts for the agreement to the terms section of the form.
 * @prop {BillingFormTexts} billingTexts - Texts for the personal details section of the form.
 * @prop {FacultyTaxesTexts} facultyTaxesTexts - Texts for the faculty taxes section of the form.
 * @prop {AmountTexts} variableAmountTexts - Texts related to variable amounts..
 * @prop {AdmissionFormTexts} acceptEuPlatescTexts - Texts for the EU Platesc acceptance section.
 * @prop {AdmissionFormTexts} submitTexts - Texts for the submit button (submitting or not).
 * @prop {AmountTexts} [variableAmountTexts] - Texts related to variable amounts..
 * @prop {TuitionFormTexts} didacticPremiumCardText - Texts for the didactic premium card section.
 * @prop {TuitionFormTexts} acceptEuPlatescTexts - Texts for the Eu Platesc acceptance section.
 *
 * The possbility to pay with the didactic card will be available only if the current selected tax its not of type `StudyCycle.postuniversitary`.
 *
 * The component integrates subcomponents like `FacultyTaxesForm`,`DidacticCardForm`, `AmountForm`, `BillingDetailsForm`, `AgreeToTermsForm`,`AcceptEuPlatescForm`, and `SubmitButton`.
 *
 * The component uses the `useForm` hook from `react-hook-form` for form handling and validation.
 */

interface Props extends TuitionFormTexts {
  facultyOptions: FacultyOption[];
  taxesOptions: Record<string, FacultyTaxOption[]>;
}

export default function TuitionForm({
  facultyOptions,
  taxesOptions,
  agreeTexts,
  billingTexts,
  facultyTaxesTexts,
  submitTexts,
  variableAmountTexts,
  didacticPremiumCardText,
  acceptEuPlatescTexts,
  recaptchaTexts,
}: Props) {
  const methods = useForm<TuitionFormInput>({
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
      faculty: "",
      tax: "",
      amount: 0,
      didacticPremiumCardOnly: false,
      partialPay: false,
      acceptEuPlatesc: false,
      recaptcha: "",
    },
  });

  const [selectedFacultyTaxOption, setSelectedFacultyTaxOption] =
    useState<FacultyTaxOption>();

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<TuitionFormInput> = useCallback(
    async (data) => {
      if (
        selectedFacultyTaxOption &&
        data.amount < selectedFacultyTaxOption?.value
      ) {
        data.partialPay = true;
      } else {
        data.partialPay = false;
      }
      try {
        const r = await submitTuition(data);
        console.log(r);
      } catch (error) {
        console.log(error);
      }
    },
    [selectedFacultyTaxOption],
  );
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto mt-12 bg-white p-10 shadow-lg rounded-lg space-y-6"
      >
        <div className="md:grid md:grid-cols-2 gap-6 flex flex-col items-center justify-center">
          <FacultyTaxesForm<TuitionFormInput>
            control={control}
            facultyOptions={facultyOptions}
            taxesOptions={taxesOptions}
            {...facultyTaxesTexts}
            setTaxesOptionParent={setSelectedFacultyTaxOption}
            isAmountVariable={true}
          />

          {selectedFacultyTaxOption &&
            selectedFacultyTaxOption.studyCycle !==
              StudyCycle.postuniversitary && (
              <DidacticCardForm {...didacticPremiumCardText} />
            )}

          {variableAmountTexts && (
            <AmountForm<TuitionFormInput>
              control={control}
              {...variableAmountTexts}
              selectedFacultyTaxOption={selectedFacultyTaxOption}
            />
          )}

          <BillingDetailsForm {...billingTexts} />

          <AgreeToTermsForm {...agreeTexts} />

          <AgreeEuPlatescForm {...acceptEuPlatescTexts} />

          <ReCAPTCHAForm<TuitionFormInput>
            control={control}
            {...recaptchaTexts}
          />

          <div className="col-span-2 w-full text-center flex items-center justify-center">
            <SubmitButton isSubmitting={isSubmitting} {...submitTexts} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
