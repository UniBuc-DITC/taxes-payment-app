import { validateReCAPTCHA } from "@/actions/forms";
import { ReCAPTCHAInput, ReCAPTCHATexts } from "@/types/forms/agreements";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, Control, Path, FieldErrors } from "react-hook-form";

/**
 * `ReCAPTCHAForm` is a React component for rendering an the reCAPTCHA verifiction of the forms.
 *
 *
 * @prop {ReCAPTCHATexts} - Text labels and validation messages for the reCAPTCHA form field.
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `ReCAPTCHAInput`.
 */

type Props<T extends ReCAPTCHAInput> = ReCAPTCHATexts & {
  control: Control<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
};

export default function ReCAPTCHAForm<T extends ReCAPTCHAInput>({
  required,
  validate,
  control,
  errors,
  disabled,
}: Props<T>) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const locale = useParams().locale;

  if (!process.env.NEXT_PUBLIC_RECAPTCHA) {
    return null;
  }
  return (
    <div>
      <Controller
        control={control}
        name={"recaptcha" as Path<T>}
        rules={{
          required,
          validate: async (value) => {
            if (!value) {
              return false;
            }
            return (await validateReCAPTCHA(value)) || validate;
          },
        }}
        disabled={disabled}
        render={({ field }) => (
          <div className="relative">
            <ReCAPTCHA
              ref={recaptchaRef}
              size="normal"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
              onChange={field.onChange}
              hl={locale}
            />
            {disabled && (
              <div className="absolute inset-0 z-10 bg-white bg-opacity-50 " />
            )}
          </div>
        )}
      />

      {errors.recaptcha && (
        <span
          className={`text-xs text-red-500 ${
            errors.recaptcha ? "block" : "hidden"
          }`}
        >
          {errors.recaptcha.message?.toString()}
        </span>
      )}
    </div>
  );
}
