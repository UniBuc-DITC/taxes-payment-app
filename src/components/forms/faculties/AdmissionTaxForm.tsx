"use client";
import {
  AdmissionTaxFormData,
  AdmissionFormTexts,
  FacultyOption,
  FacultyTaxOption,
} from "@/types/forms/faculties";
import React, { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FacultyTaxesForm from "./FacultyTaxesForm";
import ConsentToTermsForm from "../reusable/ConsentToTermsForm";
import SubmitButton from "../reusable/SubmitButton";
import { submitAdmissionTaxForm } from "@/actions/forms";
import ReCAPTCHAForm from "../reusable/ReCAPTCHAForm";
import BillingDetailsForm from "../reusable/BillingDetailsForm";
import EuPlatescConsentForm from "../reusable/EuPlatescConsentForm";
import PartialPayForm from "../reusable/PartialPayForm";
import AmountForm from "../reusable/AmountForm";
import useParentTaxOptions from "@/utils/forms/hooks/useParentTaxOptions";

/**
 * `AdmissionForm` is a React component for handling the admission forms.
 *
 * Props:
 * @prop {FacultyOption[]} facultyOptions - Array of options for faculty selection.
 * @prop {Record<string, FacultyTaxOption[]>} taxesOptions - Mapping of faculty IDs to their corresponding tax options.
 * @prop {RequiredCheckboxTexts} agreeTexts - Texts for the agreement to the terms section of the form.
 * @prop {BillingFormTexts} billingTexts - Texts for the personal details section of the form.
 * @prop {FacultyTaxesTexts} facultyTaxesTexts - Texts for the faculty taxes section of the form.
 * @prop {boolean} [isAmountVariable=false] - Indicates if the amount is variable (optional, defaults to false, it's here just in case we want to allow partial paymanet in the admission form).
 * @prop {AmountTexts} variableAmountTexts - Texts related to variable amounts, required if `isAmountVariable` is true.
 * @prop {RequiredCheckboxTexts} acceptEuPlatescTexts - Texts for the Eu Platesc acceptance section.
 * @prop {SubmitButtonTexts} submitTexts - Texts for the submit button (submitting or not).
 * @prop {ReCAPTCHATexts} recaptchaTexts - Texts for the reCAPTCHA form.
 *
 * The component integrates: `FacultyTaxesForm`, `BillingDetailsForm`, `ConsentToTermsForm`, `EuPlatescConsentForm`, and `SubmitButton`.
 *
 * The component uses the `useForm` hook from `react-hook-form` for form handling and validation.
 */

interface Props extends AdmissionFormTexts {
  facultyOptions: FacultyOption[];
  taxesOptions: Record<string, FacultyTaxOption[]>;
}

const AdmissionForm = ({
  facultyOptions,
  taxesOptions,
  agreeTexts,
  billingTexts,
  facultyTaxesTexts,
  submitTexts,
  acceptEuPlatescTexts,
  recaptchaTexts,
  partialPayTexts,
  variableAmountTexts,
}: Props) => {
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AdmissionTaxFormData>({
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
      consentEuPlatesc: false,
      recaptcha: "",
      partialPay: false,
    },
  });

  const partialPayValue = watch("partialPay");

  const onSubmit: SubmitHandler<AdmissionTaxFormData> = useCallback(
    async (data) => {
      const r = await submitAdmissionTaxForm(data);
      console.log(r);
    },
    [],
  );

  const [selectedFacultyTaxOption, setSelectedFacultyTaxOption, disabled] =
    useParentTaxOptions<FacultyTaxOption, AdmissionTaxFormData>({
      watch,
      entityId: "facultyId",
      setValue,
    });

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
};

export default AdmissionForm;
