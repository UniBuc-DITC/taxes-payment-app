import {
  EuPlatescFormFields,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import React from "react";
import { useFormContext } from "react-hook-form";
import ConsentCheckbox from "./ConsentCheckbox";

/**
 * `EuPlatescConsentForm` is a React component that renders a part of a form
 * for selecting if the user accepts to pay with the EuPlatesc provider (which is required to be `true`).
 *
 * Props:
 * @prop {RequiredCheckboxTexts} - Text label and required erro messaage for the component`.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `acceptEuPlatesc`.
 */

function EuPlatescConsentForm({ terms, required }: RequiredCheckboxTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EuPlatescFormFields>();

  return (
    <ConsentCheckbox<EuPlatescFormFields>
      errors={errors}
      id="consentEuPlatesc"
      name="consentEuPlatesc"
      register={register}
      required={required}
      label={terms}
    />
  );
}

export default EuPlatescConsentForm;
