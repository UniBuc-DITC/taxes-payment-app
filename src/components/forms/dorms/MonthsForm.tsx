import { MonthField, MonthTexts } from "@/types/forms/month";
import { useMemo } from "react";
import { Control, Controller, Path, useFormContext } from "react-hook-form";

/**
 * `MonthsForm` is a React component for selecting a month from a list of options.
 * With the options being restricted to months up to and including the current month.
 *
 * Props:
 * @template T - Extends `MonthField`, representing the specific shape of the form's month-related data.
 *
 * @prop {MonthOption[]} monthOptions - An array of `MonthOption` objects for month selection.
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {MonthTexts} - Includes label, extra text, and required error message.
 *
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `MonthField`.
 */

interface Props<T extends MonthField> extends MonthTexts {
  control: Control<T>;
}

export default function MonthsForm<T extends MonthField>({
  monthOptions,
  extra = "",
  label,
  noMonth,
  required,
  control,
}: Props<T>) {
  const {
    formState: { errors },
  } = useFormContext<MonthField>();

  const currentMonth = new Date().getMonth() + 1;
  const availableMonths = useMemo(() => {
    return monthOptions.filter((month) => month.id <= currentMonth);
  }, [monthOptions, currentMonth]);

  return (
    <div className="relative flex-col items-start">
      <div className=" flex  flex-col md:flex-row items-center w-full gap-2">
        <label htmlFor="month" className="text-sm font-medium text-gray-700">
          {label}
          {extra && <span className="ms-1">{extra}</span>}
        </label>
        <Controller
          name={"month" as Path<T>}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <div>
              <select {...field}>
                {<option value="">{noMonth}</option>}
                {availableMonths.map((month) => (
                  <option key={month.id} value={month.id}>
                    {month.label}
                  </option>
                ))}
              </select>
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
