import React, { useEffect, useRef, useState } from "react";
import { Controller, Control, useFormContext, Path } from "react-hook-form";
import {
  FacultyOption,
  FacultyTaxOption,
  FacultyTaxesAmountFields,
  FacultyTaxesTexts,
} from "@/types/forms/faculties";

/**
 * `FacultyTaxesForm` is a generic React component that renders a part of a form
 * for selecting faculties and their respective tax options.
 *
 * Props:
 * @template T - Extends `FacultyTaxesFields` which is a generic type representing the minimun required shape of the form input data.
 *
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {FacultyOption[]} facultyOptions - An array of `FacultyOption` objects for faculty selection.
 * @prop {Record<string, FacultyTaxOption[]>} taxesOptions - A record mapping faculty IDs to their corresponding tax options.
 * @prop {React.Dispatch<React.SetStateAction<FacultyTaxOption | undefined>>} [setTaxesOptionParent] - An optional function to set the selected tax option in a parent component (nedeed when the amount is variable and it's managed by the `AmountForm` component).
 * @prop {boolean} [isAmountVariable=false] - Optional boolean to indicate if the amount is variable. Defaults to `false`.If the amount it's not variable this component will handle the amount value, if the amount is variable the amount value will be handeled by the `AmountForm` component.
 * @prop {FacultyTaxesTexts} - Text labels and validation messages for various form fields.
 *
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `FacultyTaxesAmountFields`.
 */

type FacultyTaxesFormProps<T extends FacultyTaxesAmountFields> = {
  control: Control<T>;
  facultyOptions: FacultyOption[];
  taxesOptions: Record<string, FacultyTaxOption[]>;
  setTaxesOptionParent?: React.Dispatch<
    React.SetStateAction<FacultyTaxOption | undefined>
  >;
  isAmountVariable?: boolean;
} & FacultyTaxesTexts;

function FacultyTaxesForm<T extends FacultyTaxesAmountFields>({
  control,
  facultyOptions,
  taxesOptions,
  required,
  labels: lables,
  extraTaxOptions,
  setTaxesOptionParent,
  isAmountVariable = false,
}: FacultyTaxesFormProps<T>) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FacultyTaxesAmountFields>();

  const [selectedFacultyTaxOption, setSelectedFacultyTaxOption] =
    useState<FacultyTaxOption>();

  const setTaxesOption = (selectedId: string) => {
    if (selectedFaculty) {
      const st = taxesOptions[selectedFaculty].find(
        ({ id }) => id.toString() === selectedId,
      );

      setSelectedFacultyTaxOption(st);
      if (setTaxesOptionParent) {
        setTaxesOptionParent(st);
      }
      if (!isAmountVariable && st) {
        setValue("amount", st?.value);
      }
    } else {
      setSelectedFacultyTaxOption(undefined);
      if (setTaxesOptionParent) {
        setTaxesOptionParent(undefined);
      }
      if (!isAmountVariable) {
        setValue("amount", 0);
      }
    }
  };

  const selectedFaculty = watch("faculty");
  const selectedTax = watch("tax");
  const amount = watch("amount");

  useEffect(() => {
    if (selectedTax && selectedFacultyTaxOption) {
      const maxAmount = selectedFacultyTaxOption?.value;
      if (amount > maxAmount) {
        setValue("amount", maxAmount);
      }
    }
  }, [selectedTax, amount, setValue, selectedFacultyTaxOption]);

  return (
    <>
      <div className="relative">
        <label htmlFor="faculty" className="text-sm font-medium text-gray-700">
          {lables.faculty}
        </label>
        <Controller
          name={"faculty" as Path<T>}
          control={control}
          rules={{ required: required.faculty }}
          render={({ field }) => (
            <div>
              <select
                {...field}
                id="faculty"
                aria-label="Faculty"
                className={`mt-1 block w-full  border-gray-300 rounded-md shadow-sm
                   focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200`}
              >
                <option value="">{extraTaxOptions.faculty}</option>
                {facultyOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.faculty && (
                <span
                  className={`text-xs text-red-500 ${
                    errors.faculty ? "block" : "hidden"
                  }`}
                >
                  {errors.faculty.message?.toString()}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="relative">
        <label htmlFor="tax" className="text-sm font-medium text-gray-700">
          {lables.tax}
        </label>
        <Controller
          name={"tax" as Path<T>}
          control={control}
          rules={{ required: required.tax }}
          render={({ field }) => (
            <div>
              <select
                {...field}
                onChange={(e) => {
                  setTaxesOption(e.target.value);
                  field.onChange(e);
                }}
                id="tax"
                aria-label="Taxes"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                  p-2 outline-none focus:outline-blue-200"
              >
                {selectedFaculty ? (
                  <option value="">{extraTaxOptions.tax}</option>
                ) : (
                  <option value="">{extraTaxOptions.noFacultyTaxes}</option>
                )}
                {selectedFaculty &&
                  taxesOptions[selectedFaculty]?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
              </select>
              {errors.tax && (
                <span
                  className={`text-xs text-red-500 ${
                    errors.tax ? "block" : "hidden"
                  }`}
                >
                  {errors.tax.message?.toString()}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}

export default FacultyTaxesForm;
