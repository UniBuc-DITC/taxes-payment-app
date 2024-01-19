"use client";
import {
  AdmissionFormInput,
  AdmissionFormTexts,
  FacultyOption,
  FacultyTaxOption,
} from "@/types/forms/faculties";
import React, { useCallback } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import FacultyTaxesForm from "./FacultyTaxesForm";
import PersonalDetailsForm from "../reusable/PersonalDetailsForm";
import AgreeToTermsForm from "../reusable/AgreeToTermsForm";
import SubmitButton from "../reusable/SubmitButton";
import { submitAdmission } from "@/actions/forms";

/**
 * `AdmissionForm` is a React component for handling the admission forms.
 *
 * Props:
 * @prop {FacultyOption[]} facultyOptions - Array of options for faculty selection.
 * @prop {Record<string, FacultyTaxOption[]>} taxesOptions - Mapping of faculty IDs to their corresponding tax options.
 * @prop {RequiredCheckboxTexts} agreeTexts - Texts for the agreement to the terms section of the form.
 * @prop {PersonalFormTexts} personalTexts - Texts for the personal details section of the form.
 * @prop {FacultyTaxesTexts} facultyTaxesTexts - Texts for the faculty taxes section of the form.
 * @prop {boolean} [isAmountVariable=false] - Indicates if the amount is variable (optional, defaults to false, it's here just in case we want to allow partial paymanet in the admission form).
 * @prop {AmountTexts} variableAmountTexts - Texts related to variable amounts, required if `isAmountVariable` is true.
 * @prop {RequiredCheckboxTexts} acceptEuPlatescTexts - Texts for the Eu Platesc acceptance section.
 * @prop {AdmissionFormTexts} submitTexts - Texts for the submit button (submitting or not).
 *
 * The component integrates: `FacultyTaxesForm`, `PersonalDetailsForm`, `AgreeToTermsForm`, `AcceptEuPlatescForm`, and `SubmitButton`.
 *
 * The component uses the `useForm` hook from `react-hook-form` for form handling and validation.
 */

interface Props extends AdmissionFormTexts {
  isAmountVariable?: boolean;
  facultyOptions: FacultyOption[];
  taxesOptions: Record<string, FacultyTaxOption[]>;
}

const AdmissionForm = ({
  facultyOptions,
  taxesOptions,
  agreeTexts,
  personalTexts,
  facultyTaxesTexts,
  submitTexts,
  acceptEuPlatescTexts,
}: Props) => {
  const methods = useForm<AdmissionFormInput>({
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
      acceptEuPlatesc: false,
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<AdmissionFormInput> = useCallback(
    async (data) => {
      const r = await submitAdmission(data);
      console.log(r);
    },
    [],
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto mt-12 bg-white p-10 shadow-lg rounded-lg space-y-6"
      >
        <div className="md:grid md:grid-cols-2 gap-6 flex flex-col items-center justify-center">
          <FacultyTaxesForm<AdmissionFormInput>
            control={control}
            facultyOptions={facultyOptions}
            taxesOptions={taxesOptions}
            {...facultyTaxesTexts}
          />

          <PersonalDetailsForm {...personalTexts} />

          <AgreeToTermsForm {...agreeTexts} />
          <AgreeToTermsForm {...acceptEuPlatescTexts} />

          <div className="col-span-2 w-full text-center flex items-center justify-center">
            <SubmitButton isSubmitting={isSubmitting} {...submitTexts} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdmissionForm;
