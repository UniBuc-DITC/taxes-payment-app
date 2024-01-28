import {
  DormOption,
  DormTaxOption,
  DormTaxesAmountFields,
  DormTaxesTexts,
} from "@/types/forms/dorms";
import { useMemo } from "react";
import { Control, Controller, Path, useFormContext } from "react-hook-form";
import Select from "react-select";

/**
 * `DormTaxesForm` is a React component for selecting student dorms options and their respective tax options.
 *
 * Props:
 *
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {DormOption[]} dormOptions - An array of `DormOption` objects for student dorm selection.
 * @prop {Record<string, DormTaxOption[]>} taxesOptions - A record mapping student dorm IDs to their corresponding tax options.
 * @prop {DormTaxesTexts} - Includes labels and required flags for the form fields, structured as `DormTaxesTexts`.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `DormTaxesAmountFields`.
 */

type DormTaxesFormProps = {
  dormOptions: DormOption[];
  taxesOptions: Record<string, DormTaxOption[]>;
} & DormTaxesTexts;

export default function DormTaxesForm({
  dormOptions,
  taxesOptions,
  extraTaxOptions,
  labels: lables,
  required,
}: DormTaxesFormProps) {
  const {
    watch,
    setValue,
    formState: { errors },
    control,
  } = useFormContext<DormTaxesAmountFields>();

  const selectedDorm = watch("dormId");

  const setAmount = (selectedId: string) => {
    if (selectedDorm) {
      const st = taxesOptions[selectedDorm].find(
        ({ id }) => id.toString() === selectedId,
      );
      if (st) {
        setValue("amount", st?.value);
      }
    } else {
      setValue("amount", 0);
    }
  };

  const selectDormOptions = useMemo(
    () => dormOptions.map(({ id, label }) => ({ value: id.toString(), label })),
    [dormOptions],
  );

  const selectTaxOptions = useMemo(
    () =>
      !selectDormOptions
        ? []
        : taxesOptions[selectedDorm]?.map(({ id, label }) => ({
            value: id.toString(),
            label,
          })),
    [selectDormOptions, selectedDorm, taxesOptions],
  );

  return (
    <>
      <div className="relative ">
        <label htmlFor="dorm" className="text-sm font-medium text-gray-700">
          {lables.dormId}
        </label>
        <Controller
          name={"dormId"}
          control={control}
          rules={{ required: required.dormId }}
          render={({ field }) => (
            <div>
              <Select
                id="dorm"
                aria-label="Dorm"
                {...field}
                options={selectDormOptions}
                value={selectDormOptions.find((c) => c.value === field.value)}
                onChange={(val) => field?.onChange(val?.value)}
                placeholder={extraTaxOptions.dorm}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor:
                      errors.dormId && !state.isFocused ? "red" : "intital",
                  }),
                }}
              />
              {errors.dormId && (
                <span
                  className={`text-xs text-red-500 ${
                    errors.dormId ? "block" : "hidden"
                  }`}
                >
                  {errors.dormId.message?.toString()}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="relative">
        <label htmlFor="tax" className="text-sm font-medium text-gray-700">
          {lables.taxId}
        </label>
        <Controller
          name={"taxId"}
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
                  if (val) setAmount(val?.value);
                  field.onChange(val?.value);
                }}
                placeholder={
                  !selectedDorm
                    ? extraTaxOptions.tax
                    : extraTaxOptions.noDormTaxes
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
