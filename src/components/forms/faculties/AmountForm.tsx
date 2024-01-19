import { AmountTexts } from "@/types/forms/amount";
import {
  FacultyTaxOption,
  FacultyTaxesAmountFields,
} from "@/types/forms/faculties";
import { Control, Controller, Path, useFormContext } from "react-hook-form";

/**
 * `AmountForm` is a React component for rendering an input form specifically for handling the variable amount.
 *
 * Props:
 * @template T - Extends `FacultyTaxesAmountFields` which is a generic type representing the minimun required shape of the form input data.
 *
 * @prop {Control<T>} control - Control object from `react-hook-form` for managing form state.
 * @prop {FacultyTaxOption | undefined} selectedFacultyTaxOption - The currently selected faculty tax option, used to determine the range of acceptable values for the amount input. (This props connects the component with the `FacultyTaxesForm`)
 * @prop {AmountTexts} - Text labels and validation messages for the amount form field.
 *
 * It renders a range input and a number input for specifying the amount, with constraints based on the selected faculty tax option.It also allows the amount to be chaneg via the input number or the slider.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `FacultyTaxesAmountFields`.
 */

type AmountFormProps<T extends FacultyTaxesAmountFields> = {
  control: Control<T>;
  selectedFacultyTaxOption: FacultyTaxOption | undefined;
} & AmountTexts;

export default function AmountForm<T extends FacultyTaxesAmountFields>({
  control,
  required,
  labels: lables,
  validate,
  selectedFacultyTaxOption,
}: AmountFormProps<T>) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FacultyTaxesAmountFields>();

  return (
    <div className="col-span-1 md:col-span-2 items-center justify-center flex">
      <div className="relative w-full md:w-1/2 mx-auto">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
          {lables.amount}
        </label>
        <Controller
          name={"amount" as Path<T>}
          control={control}
          rules={{
            required: required.amount,
            validate: (value) =>
              (typeof value === "number" && value >= 100) || validate.amount,
          }}
          render={({ field }) => (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="range"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                min={0}
                max={selectedFacultyTaxOption?.value || 0}
                step={50}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-200 focus:outline-none focus:ring-0 focus:shadow-none accent-slate-500"
              />
              <input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                min={0}
                max={selectedFacultyTaxOption?.value || 0}
                step={50}
                className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500  p-2 outline-none focus:outline-blue-200 "
              />
            </div>
          )}
        />
        {errors.amount && (
          <span
            className={`text-xs text-red-500 ${
              errors.amount ? "block" : "hidden"
            }`}
          >
            {errors.amount.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
}
