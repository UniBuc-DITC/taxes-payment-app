import {
  AgreeTermsFormFiles,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import React from "react";
import { useFormContext } from "react-hook-form";
import ConsentCheckbox from "./ConsentCheckbox";

/**
 * `AgreeToTermsForm` is a React component that renders a part of a form
 * for selecting if the user accepts the terms of of service (which is required to be `true`).
 *
 * Props:
 * @prop {RequiredCheckboxTexts} - Text label and required erro messaage for the component`.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `agreeToTerms`.
 */

function AgreeToTermsForm({ terms, required }: RequiredCheckboxTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AgreeTermsFormFiles>();

  return (
    <ConsentCheckbox<AgreeTermsFormFiles>
      errors={errors}
      id="agreeToTerms"
      name="agreeToTerms"
      register={register}
      required={required}
      label={terms}
    />
  );
}

export default AgreeToTermsForm;
