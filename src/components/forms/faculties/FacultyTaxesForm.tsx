import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Controller,
  Control,
  useFormContext,
  Path,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";
import {
  FacultyOption,
  FacultyTaxOption,
  FacultyTaxesAmountFields,
  FacultyTaxesTexts,
} from "@/types/forms/faculties";
import Select from "react-select";

/**
 * `FacultyTaxesForm` is a React component that renders a part of a form
 * for selecting faculties and their respective tax options.
 *
 * Props:
 *
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {FacultyOption[]} facultyOptions - An array of `FacultyOption` objects for faculty selection.
 * @prop {Record<string, FacultyTaxOption[]>} taxesOptions - A record mapping faculty IDs to their corresponding tax options.
 * @prop {React.Dispatch<React.SetStateAction<FacultyTaxOption | undefined>>} [setTaxesOptionParent] - An optional function to set the selected tax option in a parent component (nedeed when the amount is variable and it's managed by the `AmountForm` component).
 * @prop {boolean} [isAmountVariable=false] - Optional boolean to indicate if the amount is variable. Defaults to `false`.If the amount it's not variable this component will handle the amount value, if the amount is variable the amount value will be handeled by the `AmountForm` component.
 * @prop {FacultyTaxesTexts} - Text labels and validation messages for various form fields.
 * @prop {UseFormWatch<T>} watch - Function from `react-hook-form` to watch the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 * @prop {UseFormSetValue<T>} setValue - Function from `react-hook-form` to set the form state.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `FacultyTaxesAmountFields`.
 */

type FacultyTaxesFormProps<TFielValues extends FacultyTaxesAmountFields> = {
  facultyOptions: FacultyOption[];
  taxesOptions: Record<string, FacultyTaxOption[]>;
  setTaxesOptionParent?: React.Dispatch<
    React.SetStateAction<FacultyTaxOption | undefined>
  >;
  isAmountVariable?: boolean;
  control: Control<TFielValues>;
  watch: UseFormWatch<TFielValues>;
  errors: FieldErrors<TFielValues>;
  setValue: UseFormSetValue<TFielValues>;
} & FacultyTaxesTexts;

function FacultyTaxesForm<TFielValues extends FacultyTaxesAmountFields>({
  facultyOptions,
  taxesOptions,
  required,
  labels,
  extraTaxOptions,
  setTaxesOptionParent,
  isAmountVariable = false,
  control,
  errors,
  watch,
  setValue,
}: FacultyTaxesFormProps<TFielValues>) {
  const facultyId = "facultyId" as Path<TFielValues>;
  const taxId = "taxId" as Path<TFielValues>;
  const amount = "amount" as Path<TFielValues>;

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
        setValue(
          amount,
          st?.value as PathValue<TFielValues, Path<TFielValues>>,
        );
      }
    } else {
      setSelectedFacultyTaxOption(undefined);
      if (setTaxesOptionParent) {
        setTaxesOptionParent(undefined);
      }
      if (!isAmountVariable) {
        setValue(amount, 0 as PathValue<TFielValues, Path<TFielValues>>);
      }
    }
  };

  const selectedFaculty = watch(facultyId).valueOf();
  const selectedTax = watch(taxId).valueOf();
  const selctedAmount = watch(amount).valueOf();

  useEffect(() => {
    if (selectedTax && selectedFacultyTaxOption) {
      const maxAmount = selectedFacultyTaxOption?.value;
      if (Number(selctedAmount) > maxAmount) {
        setValue(
          amount,
          maxAmount as PathValue<TFielValues, Path<TFielValues>>,
        );
      }
    }
  }, [selectedTax, selctedAmount, setValue, selectedFacultyTaxOption, amount]);

  const selectFacultyOptions = useMemo(
    () =>
      facultyOptions.map(({ id, label }) => ({ value: id.toString(), label })),
    [facultyOptions],
  );

  const selectTaxOptions = useMemo(
    () =>
      !selectFacultyOptions
        ? []
        : taxesOptions[selectedFaculty]?.map(({ id, label }) => ({
            value: id.toString(),
            label,
          })),
    [selectFacultyOptions, selectedFaculty, taxesOptions],
  );

  return (
    <>
      <div className="relative">
        <label htmlFor="faculty" className="text-sm font-medium text-gray-700">
          {labels.facultyId}
        </label>
        <Controller
          name={facultyId}
          control={control}
          rules={{ required: required.facultyId }}
          render={({ field }) => (
            <div>
              <Select
                id="faculty"
                aria-label="Faculty"
                {...field}
                options={selectFacultyOptions}
                value={selectFacultyOptions.find(
                  (c) => c.value === field.value,
                )}
                onChange={(val) => field?.onChange(val?.value)}
                placeholder={extraTaxOptions.faculty}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor:
                      errors.facultyId && !state.isFocused ? "red" : "intital",
                  }),
                }}
              />
              {errors.facultyId && (
                <span
                  className={`text-xs text-red-500 ${
                    errors.facultyId ? "block" : "hidden"
                  }`}
                >
                  {errors.facultyId.message?.toString()}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="relative">
        <label htmlFor="tax" className="text-sm font-medium text-gray-700">
          {labels.taxId}
        </label>
        <Controller
          name={taxId}
          control={control}
          rules={{ required: required.taxId }}
          render={({ field }) => (
            <div>
              <Select
                id="tax"
                aria-label="Taxes"
                {...field}
                options={selectTaxOptions}
                value={selectTaxOptions?.find((c) => c.value === field.value)}
                onChange={(val) => {
                  if (val) setTaxesOption(val?.value);
                  field.onChange(val?.value);
                }}
                placeholder={
                  !selectedFaculty
                    ? extraTaxOptions.tax
                    : extraTaxOptions.noFacultyTaxes
                }
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor:
                      errors.taxId && !state.isFocused ? "red" : "initial",
                  }),
                }}
              />
              {errors.taxId && (
                <span
                  className={`text-xs text-red-500 ${
                    errors.taxId ? "block" : "hidden"
                  }`}
                >
                  {errors.taxId.message?.toString()}
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
