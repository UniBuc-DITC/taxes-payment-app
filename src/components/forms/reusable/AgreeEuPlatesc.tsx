import { EuPlatescFormFields, RequiredCheckboxTexts } from "@/types/forms/agreementsFormTypes";
import React from "react";
import { useFormContext } from "react-hook-form";

/**
 * `AgreeEuPlatescForm` is a React component that renders a part of a form
 * for selecting if the user accepts to pay with the Eu Platesc provider (which is required to be `true`).
 *
 * Props:
 * @prop {RequiredCheckboxTexts} - Text label and required erro messaage for the component`.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `acceptEuPlatesc`.
 */

function AgreeEuPlatescForm({ terms, required }: RequiredCheckboxTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EuPlatescFormFields>();

  return (
    <div className="col-span-2">
      <label htmlFor="acceptEuPlatesc" className="flex items-center">
        <input
          type="checkbox"
          {...register("acceptEuPlatesc", {
            required,
          })}
          id="acceptEuPlatesc"
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded accent-slate-500"
        />
        <span className="ml-2 text-sm text-gray-600 [&>a]:underline [&>a]:text-blue-500">
          {terms}
        </span>
      </label>
      {errors.acceptEuPlatesc && (
        <span
          className={`text-xs text-red-500 ${
            errors.acceptEuPlatesc ? "block" : "hidden"
          }`}
        >
          {errors.acceptEuPlatesc.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default AgreeEuPlatescForm;
