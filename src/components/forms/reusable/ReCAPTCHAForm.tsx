import { validateReCAPTCHA } from "@/actions/forms";
import { ReCAPTCHAInput, ReCAPTCHATexts } from "@/types/forms/agreements";
import { useLocale } from "next-intl";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, Control, Path, useFormContext } from "react-hook-form";

/**
 * `ReCAPTCHAForm` is a React component for rendering an the reCAPTCHA verifiction of the forms.
 *
 *
 * @prop {ReCAPTCHATexts} - Text labels and validation messages for the reCAPTCHA form field.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `ReCAPTCHAInput`.
 */

export default function ReCAPTCHAForm({ required, validate }: ReCAPTCHATexts) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    formState: { errors },
    control,
  } = useFormContext<ReCAPTCHAInput>();
  const locale = useLocale();

  if (!process.env.NEXT_PUBLIC_RECAPTCHA) {
    return;
  }
  return (
    <div>
      <Controller
        control={control}
        name={"recaptcha"}
        rules={{
          required,
          validate: async (value) => {
            if (!value) {
              return false;
            }
            return (await validateReCAPTCHA(value)) || validate;
          },
        }}
        render={({ field }) => (
          <ReCAPTCHA
            ref={recaptchaRef}
            size="normal"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
            onChange={field.onChange}
            hl={locale}
          />
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
