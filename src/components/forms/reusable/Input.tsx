import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputProps<TFieldValues extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "required"
> & {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number";
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  registerOptions?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  required: string | boolean;
  placeholder?: string;
  errors: FieldErrors<TFieldValues>;
};

export default function Input<TFieldValues extends FieldValues>({
  id,
  label,
  type = "text",
  name,
  register,
  registerOptions,
  required,
  placeholder = "",
  errors,
  ...props
}: InputProps<TFieldValues>) {
  return (
    <div className="relative">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        {...register(name, { required, ...registerOptions })}
        id={id}
        aria-label={name}
        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 mb-1 ${
          errors[name] ? "outline outline-1 outline-red-400" : ""
        }`}
        placeholder={placeholder}
        aria-invalid={errors[name] ? true : false}
        type={type}
      />
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
