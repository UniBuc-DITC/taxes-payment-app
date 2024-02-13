"use client";

import {
  FacultyOption,
  FacultyTaxOption,
  TuitionTaxFormData,
  TuitionFormTexts,
} from "@/types/forms/faculties";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FacultyTaxesForm from "./FacultyTaxesForm";
import DidacticCardForm from "./DidacticCardForm";
import AmountForm from "../reusable/AmountForm";
import EuPlatescConsentForm from "../reusable/EuPlatescConsentForm";
import ConsentToTermsForm from "../reusable/ConsentToTermsForm";
import SubmitButton from "../reusable/SubmitButton";
import { submitTuitionTaxForm } from "@/actions/forms";
import ReCAPTCHAForm from "../reusable/ReCAPTCHAForm";
import BillingDetailsForm from "../reusable/BillingDetailsForm";
import PartialPayForm from "../reusable/PartialPayForm";
import useParentTaxOptions from "@/utils/forms/hooks/useParentTaxOptions";

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
 * @prop {ReCAPTCHATexts} recaptchaTexts - Texts for the reCAPTCHA form.
 *
 * The possbility to pay with the didactic card will be available only if the current selected tax its not of type `StudyCycle.postuniversitary`.
 *
 * The component integrates subcomponents like `FacultyTaxesForm`,`DidacticCardForm`, `AmountForm`, `BillingDetailsForm`, `ConsentToTermsForm`,`EuPlatescConsentForm`, and `SubmitButton`.
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
  partialPayTexts,
}: Props) {
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TuitionTaxFormData>({
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
      facultyId: "",
      taxId: "",
      amount: 0,
      didacticPremiumCardOnly: false,
      partialPay: false,
      consentEuPlatesc: false,
      recaptcha: "",
    },
  });

  const partialPayValue = watch("partialPay");

  const [selectedFacultyTaxOption, setSelectedFacultyTaxOption, disabled] =
    useParentTaxOptions<FacultyTaxOption, TuitionTaxFormData>({
      watch,
      entityId: "facultyId",
      setValue,
    });

  const onSubmit: SubmitHandler<TuitionTaxFormData> = useCallback(
    async (data) => {
      try {
        const r = await submitTuitionTaxForm(data);
        console.log(r);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto mt-12 bg-white p-10 shadow-lg rounded-lg space-y-6"
    >
      <div className="md:grid md:grid-cols-2 gap-6 flex flex-col items-center justify-center">
        <FacultyTaxesForm
          facultyOptions={facultyOptions}
          taxesOptions={taxesOptions}
          {...facultyTaxesTexts}
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
          setTaxesOptionParent={setSelectedFacultyTaxOption}
          partialPay={partialPayValue}
        />

        <PartialPayForm
          register={register}
          {...partialPayTexts}
          disabled={disabled}
        />
        <DidacticCardForm
          errors={errors}
          register={register}
          {...didacticPremiumCardText}
          disabled={disabled}
        />
        {partialPayValue && (
          <AmountForm
            control={control}
            {...variableAmountTexts}
            selectedEntityTaxOption={selectedFacultyTaxOption}
            errors={errors}
          />
        )}

        <BillingDetailsForm
          {...billingTexts}
          errors={errors}
          register={register}
          disabled={disabled}
          renderAddress={true}
        />

        <ConsentToTermsForm
          {...agreeTexts}
          errors={errors}
          register={register}
          disabled={disabled}
        />
        <EuPlatescConsentForm
          {...acceptEuPlatescTexts}
          errors={errors}
          register={register}
          disabled={disabled}
        />

        <ReCAPTCHAForm
          {...recaptchaTexts}
          control={control}
          errors={errors}
          disabled={disabled}
        />
        <div className="col-span-2 w-full text-center flex items-center justify-center">
          <SubmitButton
            isSubmitting={isSubmitting}
            {...submitTexts}
            disabled={disabled}
          />
        </div>
      </div>
    </form>
  );
}
