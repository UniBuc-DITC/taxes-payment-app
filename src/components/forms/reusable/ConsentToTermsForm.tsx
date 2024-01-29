import {
  ConsentTermsFormFields,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import React from "react";
import { useFormContext } from "react-hook-form";
import ConsentCheckbox from "./ConsentCheckbox";

/**
 * `ConsentToTermsForm` is a React component that renders a part of a form
 * for selecting if the user accepts the terms of of service (which is required to be `true`).
 *
 * Props:
 * @prop {RequiredCheckboxTexts} - Text label and required erro messaage for the component`.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `agreeToTerms`.
 */

function ConsentToTermsForm({ terms, required }: RequiredCheckboxTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ConsentTermsFormFields>();

  return (
    <ConsentCheckbox<ConsentTermsFormFields>
      errors={errors}
      id="consentToTerms"
      name="consentToTerms"
      register={register}
      required={required}
      label={terms}
    />
  );
}

export default ConsentToTermsForm;
