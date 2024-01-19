import {
  DidacticFormFields,
  DidacticPremiumCardTexts,
} from "@/types/forms/faculties";
import React from "react";
import { useFormContext } from "react-hook-form";
/**
 * `DidacticCardForm` is a React component that renders a part of a form
 * for selecting if the user wants to pay with the didactic card.
 *
 * Props:
 * @prop {text} - Text label for the component`.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with a checkbox `didacticPremiumCardOnly`.
 */

function DidacticCardForm({ text }: DidacticPremiumCardTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext<DidacticFormFields>();

  return (
    <div className="col-span-2">
      <label htmlFor="didacticPremiumCardOnly" className="flex items-center">
        <input
          type="checkbox"
          {...register("didacticPremiumCardOnly")}
          id="didacticPremiumCardOnly"
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded accent-slate-500"
        />
        <span className="ml-2 text-sm text-gray-600">{text}</span>
      </label>
      {errors.didacticPremiumCardOnly && (
        <span
          className={`text-xs text-red-500 ${
            errors.didacticPremiumCardOnly ? "block" : "hidden"
          }`}
        >
          {errors.didacticPremiumCardOnly.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default DidacticCardForm;
