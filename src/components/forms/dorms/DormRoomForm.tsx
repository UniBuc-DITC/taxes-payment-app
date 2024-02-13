import { DormRoomNumberField, DormRoomNumberTexts } from "@/types/forms/dorms";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import Input from "../reusable/Input";

interface DormRoomFormProps<T extends DormRoomNumberField>
  extends DormRoomNumberTexts {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

export default function DormRoomForm<T extends DormRoomNumberField>({
  register,
  errors,
  label,
  required,
  placeholder,
  pattern,
  disabled,
}: DormRoomFormProps<T>) {
  return (
    <Input
      id="dormRoomNumber"
      label={label}
      name={"dormRoomNumber" as Path<T>}
      register={register}
      required={required}
      placeholder={placeholder}
      errors={errors}
      type="number"
      disabled={disabled}
      registerOptions={{
        min: {
          value: 1,
          message: pattern,
        },
        valueAsNumber: true,
      }}
    />
  );
}
