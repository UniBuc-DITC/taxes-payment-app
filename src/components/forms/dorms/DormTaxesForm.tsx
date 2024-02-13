import {
  DormOption,
  DormTaxOption,
  AccommodationTaxesAmountFields,
  DormTaxesTexts,
} from "@/types/forms/dorms";
import useSetEntityTaxOption from "@/utils/forms/hooks/useSetEntityTaxOption";
import { useMemo } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
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
 * @prop {UseFormWatch<T>} watch - Function from `react-hook-form` to watch the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 * @prop {UseFormSetValue<T>} setValue - Function from `react-hook-form` to set the form state.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `DormTaxesAmountFields`.
 */

type DormTaxesFormProps<T extends AccommodationTaxesAmountFields> = {
  dormOptions: DormOption[];
  taxesOptions: Record<string, DormTaxOption[]>;
  watch: UseFormWatch<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  setTaxesOptionParent?: React.Dispatch<
    React.SetStateAction<DormTaxOption | undefined>
  >;
  partialPay?: boolean;
} & DormTaxesTexts;

export default function DormTaxesForm<
  T extends AccommodationTaxesAmountFields,
>({
  dormOptions,
  taxesOptions,
  extraTaxOptions,
  labels,
  required,
  control,
  watch,
  setValue,
  errors,
  setTaxesOptionParent,
  partialPay = false,
}: DormTaxesFormProps<T>) {
  const dormId = "dormId" as Path<T>;
  const taxId = "taxId" as Path<T>;

  const selectedDorm = watch(dormId)?.valueOf()?.toString();

  const [selectedDormTaxOption, setSelectedDormTaxOption, setTaxOption] =
    useSetEntityTaxOption<DormTaxOption, T>({
      setValue,
      watch,
      selectedEntityId: selectedDorm,
      taxesOptions,
      setTaxesOptionParent,
      partialPay,
    });

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
          {labels.dormId}
        </label>
        <Controller
          name={dormId}
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
          {labels.taxId}
        </label>
        <Controller
          name={taxId}
          control={control}
          rules={{ required: required.taxId }}
          disabled={!selectedDorm}
          render={({ field }) => (
            <div>
              <Select
                id="tax"
                aria-label="Taxes"
                {...field}
                options={selectTaxOptions}
                value={selectTaxOptions?.find((c) => c.value === field.value)}
                onChange={(val) => {
                  if (val) setTaxOption(val?.value);
                  field.onChange(val?.value);
                }}
                isDisabled={!selectedDorm}
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
