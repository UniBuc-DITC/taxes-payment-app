import {
  ConsentTermsFormFields,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import React from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import ConsentCheckbox from "./ConsentCheckbox";

/**
 * `ConsentToTermsForm` is a React component that renders a part of a form
 * for selecting if the user accepts the terms of of service (which is required to be `true`).
 *
 * Props:
 * @prop {RequiredCheckboxTexts} - Text label and required erro messaage for the component`.
 * @prop {UseFormRegister<T>} register - Register function from `react-hook-form` for managing the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `agreeToTerms`.
 */

type Props<T extends ConsentTermsFormFields> = RequiredCheckboxTexts & {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
};

function ConsentToTermsForm<T extends ConsentTermsFormFields>({
  terms,
  required,
  register,
  errors,
  disabled,
}: Props<T>) {
  return (
    <ConsentCheckbox<T>
      errors={errors}
      id="consentToTerms"
      name={"consentToTerms" as Path<T>}
      register={register}
      required={required}
      label={terms}
      disabled={disabled}
    />
  );
}

export default ConsentToTermsForm;
