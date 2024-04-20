"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors;
  defaultValue: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  register,
  name,
  errors,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700">{label}</label>
      <input
        className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-xs italic text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormInput;
