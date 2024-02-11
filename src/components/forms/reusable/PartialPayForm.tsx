import { Path, UseFormRegister } from "react-hook-form";
import ConsentCheckbox from "./ConsentCheckbox";
import { InputBaseTexts } from "@/types/forms/reusable";
import { PartialPayField } from "@/types/forms/amount";

type Props<T extends PartialPayField> = InputBaseTexts & {
  register: UseFormRegister<T>;
  disabled?: boolean;
};

export default function PartialPayForm<T extends PartialPayField>({
  register,
  label,
  disabled,
}: Props<T>) {
  return (
    <ConsentCheckbox<T>
      id="partialPay"
      name={"partialPay" as Path<T>}
      register={register}
      required={false}
      label={label}
      disabled={disabled}
    />
  );
}
