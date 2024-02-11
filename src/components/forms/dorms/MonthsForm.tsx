import { MonthField, MonthSelectTexts } from "@/types/forms/month";
import { useMemo } from "react";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import Select from "react-select";

/**
 * `MonthsForm` is a React component for selecting a month from a list of options.
 * With the options being restricted to months up to and including the current month.
 *
 * @prop {MonthOption[]} monthOptions - An array of `MonthOption` objects for month selection.
 * @prop {MonthTexts} - Includes label, extra text, and required error message.
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `MonthField`.
 */

type Props<T extends MonthField> = MonthSelectTexts & {
  errors: FieldErrors<T>;
  control: Control<T>;
  disabled?: boolean;
};

export default function MonthsForm<T extends MonthField>({
  monthOptions,
  extra = "",
  label,
  noMonth,
  required,
  control,
  errors,
  disabled,
}: Props<T>) {
  const currentMonth = new Date().getMonth() + 1;
  const availableMonths = useMemo(() => {
    const sortedMonths = monthOptions
      .filter(({ value }) => {
        const monthValue = parseInt(value);
        const normalizedMonth =
          monthValue > currentMonth ? monthValue - 12 : monthValue;
        return (
          normalizedMonth > currentMonth - 4 && normalizedMonth <= currentMonth
        );
      })
      .sort((a, b) => {
        const aValue = parseInt(a.value);
        const bValue = parseInt(b.value);
        const adjustedA = aValue >= 11 ? aValue - 12 : aValue;
        const adjustedB = bValue >= 11 ? bValue - 12 : bValue;
        return adjustedA - adjustedB;
      });

    return sortedMonths;
  }, [monthOptions, currentMonth]);

  return (
    <div className="relative flex-col items-start">
      <div className=" flex  flex-col md:flex-row items-center w-full gap-2">
        <label htmlFor="month" className="text-sm font-medium text-gray-700">
          {`(${label})`}
          {extra && <span className="ms-1">{extra}</span>}
        </label>
        <Controller
          name={"month" as Path<T>}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <div>
              <Select
                id="month"
                aria-label="Month"
                {...field}
                options={availableMonths}
                value={availableMonths.find((c) => c.value === field.value)}
                onChange={(val) => field?.onChange(val?.value)}
                placeholder={noMonth}
                isDisabled={disabled}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor:
                      errors.month && !state.isFocused ? "red" : "intital",
                  }),
                }}
              />
            </div>
          )}
        />
      </div>
      {errors.month && (
        <span
          className={`text-xs text-red-500 text-start w-full ${
            errors.month ? "block" : "hidden"
          }`}
        >
          {errors.month.message?.toString()}
        </span>
      )}
    </div>
  );
}
