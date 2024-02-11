import { AmountFiled, AmountTexts } from "@/types/forms/amount";
import { DormTaxOption } from "@/types/forms/dorms";
import { FacultyTaxOption } from "@/types/forms/faculties";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";

/**
 * `AmountForm` is a React component for rendering an input form specifically for handling the variable amount.
 *
 * Props:
 * @template T - Extends `FacultyTaxesAmountFields` which is a generic type representing the minimun required shape of the form input data.
 *
 * @prop {Control<T>} control - Control object from `react-hook-form` for managing form state.
 * @prop {FacultyTaxOption | DormTaxOption | undefined} selectedEntityTaxOption - The currently selected entity tax option, used to determine the range of acceptable values for the amount input. (This props connects the component with the `FacultyTaxesForm` or `DormTaxesOption`)
 * @prop {AmountTexts} - Text labels and validation messages for the amount form field.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 * @prop {AmountField} required - Required text for the amount input.
 *
 * It renders a range input and a number input for specifying the amount, with constraints based on the selected faculty tax option.It also allows the amount to be chaneg via the input number or the slider.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `FacultyTaxesAmountFields`.
 */

type AmountFormProps<T extends AmountFiled> = {
  control: Control<T>;
  selectedEntityTaxOption: FacultyTaxOption | DormTaxOption | undefined;
  errors: FieldErrors<T>;
} & AmountTexts;

export default function AmountForm<T extends AmountFiled>({
  control,
  required,
  labels,
  validate,
  selectedEntityTaxOption,
  errors,
}: AmountFormProps<T>) {
  return (
    <div className="col-span-1 md:col-span-2 items-center justify-center flex transition-all ">
      <div className="relative w-full md:w-1/2 mx-auto">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
          {labels.amount}
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
                min={100}
                max={selectedEntityTaxOption?.value || 0}
                step={50}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-200 focus:outline-none focus:ring-0 focus:shadow-none accent-slate-500"
              />
              <input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                min={100}
                max={selectedEntityTaxOption?.value || 0}
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
