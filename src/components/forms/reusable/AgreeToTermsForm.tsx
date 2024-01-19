import {
  AgreeTermsFormFiles,
  RequiredCheckboxTexts,
} from "@/types/forms/agreementsFormTypes";
import React from "react";
import { useFormContext } from "react-hook-form";

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
    <div className="col-span-2">
      <label htmlFor="agreeToTerms" className="flex items-center">
        <input
          type="checkbox"
          {...register("agreeToTerms", {
            required,
          })}
          id="agreeToTerms"
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded accent-slate-500"
        />
        <span className="ml-2 text-sm text-gray-600 [&>a]:underline [&>a]:text-blue-500">
          {terms}
        </span>
      </label>
      {errors.agreeToTerms && (
        <span
          className={`text-xs text-red-500 ${
            errors.agreeToTerms ? "block" : "hidden"
          }`}
        >
          {errors.agreeToTerms.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default AgreeToTermsForm;
