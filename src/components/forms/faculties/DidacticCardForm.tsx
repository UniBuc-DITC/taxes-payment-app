import {
  DidacticFormFields,
  DidacticPremiumCardTexts,
} from "@/types/forms/faculties";
import React from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import ConsentCheckbox from "../reusable/ConsentCheckbox";
/**
 * `DidacticCardForm` is a React component that renders a part of a form
 * for selecting if the user wants to pay with the didactic card.
 *
 * Props:
 * @prop {text} - Text label for the component`.
 * @prop {UseFormRegister<T>} register - Register function from `react-hook-form` for managing the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `didacticPremiumCardOnly`.
 */

type Props<T extends DidacticFormFields> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
} & DidacticPremiumCardTexts;

function DidacticCardForm<T extends DidacticFormFields>({
  text,
  register,
  errors,
  disabled,
}: Props<T>) {
  return (
    <>
      <ConsentCheckbox
        id="didacticPremiumCardOnly"
        name={"didacticPremiumCardOnly" as Path<T>}
        register={register}
        required={false}
        label={text}
        disabled={disabled}
        errors={errors}
      />
    </>
  );
}

export default DidacticCardForm;
