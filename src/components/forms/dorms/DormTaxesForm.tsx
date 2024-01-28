import {
  DormOption,
  DormTaxOption,
  DormTaxesAmountFields,
  DormTaxesTexts,
} from "@/types/forms/dorms";
import { Control, Controller, Path, useFormContext } from "react-hook-form";

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

type DromTaxesFormProps = {
  dormOptions: DormOption[];
  taxesOptions: Record<string, DormTaxOption[]>;
} & DormTaxesTexts;

export default function DormTaxesForm({
  dormOptions,
  taxesOptions,
  extraTaxOptions,
  labels: lables,
  required,
}: DromTaxesFormProps) {
  const {
    watch,
    setValue,
    formState: { errors },
    control,
  } = useFormContext<DormTaxesAmountFields>();

  const selectedDorm = watch("dorm");

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

  return (
    <>
      <div className="relative ">
        <label htmlFor="dorm" className="text-sm font-medium text-gray-700">
          {lables.dorm}
        </label>
        <Controller
          name={"dorm"}
          control={control}
          rules={{ required: required.dorm }}
          render={({ field }) => (
            <div>
              <select
                {...field}
                id="dorm"
                aria-label="Dorm"
                className={`mt-1 block w-full  border-gray-300 rounded-md shadow-sm
                   focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200`}
              >
                <option value="">{extraTaxOptions.dorm}</option>
                {dormOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.dorm && (
                <span
                  className={`text-xs text-red-500 ${
                    errors.dorm ? "block" : "hidden"
                  }`}
                >
                  {errors.dorm.message?.toString()}
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
          name={"tax"}
          control={control}
          rules={{ required: required.tax }}
          render={({ field }) => (
            <div>
              <select
                {...field}
                onChange={(e) => {
                  setAmount(e.target.value);
                  field.onChange(e);
                }}
                id="tax"
                aria-label="Taxes"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                  p-2 outline-none focus:outline-blue-200"
              >
                {selectedDorm ? (
                  <option value="">{extraTaxOptions.tax}</option>
                ) : (
                  <option value="">{extraTaxOptions.noDormTaxes}</option>
                )}
                {selectedDorm &&
                  taxesOptions[selectedDorm]?.map((option) => (
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
