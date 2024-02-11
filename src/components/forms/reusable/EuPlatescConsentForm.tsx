import {
  EuPlatescFormFields,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import React from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import ConsentCheckbox from "./ConsentCheckbox";

/**
 * `EuPlatescConsentForm` is a React component that renders a part of a form
 * for selecting if the user accepts to pay with the EuPlatesc provider (which is required to be `true`).
 *
 * Props:
 * @prop {RequiredCheckboxTexts} - Text label and required erro messaage for the component`.
 * @prop {UseFormRegister<T>} register - Register function from `react-hook-form` for managing the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `acceptEuPlatesc`.
 */

type Props<T extends EuPlatescFormFields> = RequiredCheckboxTexts & {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
};

function EuPlatescConsentForm<T extends EuPlatescFormFields>({
  terms,
  required,
  errors,
  register,
  disabled,
}: Props<T>) {
  return (
    <ConsentCheckbox<T>
      errors={errors}
      id="consentEuPlatesc"
      name={"consentEuPlatesc" as Path<T>}
      register={register}
      required={required}
      label={terms}
      disabled={disabled}
    />
  );
}

export default EuPlatescConsentForm;
