import { ReactNode } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type ConsentProps<TFieldValues extends FieldValues> = {
  id: string;
  label?: string | ReactNode;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  registerOptions?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  required: string | boolean;
  errors: FieldErrors<TFieldValues>;
};

export default function ConsentCheckbox<TFieldValues extends FieldValues>({
  id,
  label,
  name,
  register,
  registerOptions,
  required,
  errors,
}: ConsentProps<TFieldValues>) {
  return (
    <div className="col-span-2">
      <input
        type="checkbox"
        {...register(name, {
          required,
          ...registerOptions,
        })}
        id={id}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded accent-slate-500"
      />
      <label
        className="ml-2 text-sm text-gray-600 [&>a]:underline [&>a]:text-blue-500"
        htmlFor={id}
      >
        {label}
      </label>
      {errors[name] && (
        <span
          className={`text-xs text-red-500 ${
            errors[name] ? "block" : "hidden"
          }`}
        >
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
}
