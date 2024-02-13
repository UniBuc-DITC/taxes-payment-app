import {
  BillingFormFields,
  BillingFormTexts,
} from "@/types/forms/billingDetails";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import Input from "./Input";
import { hasKey } from "@/utils/forms/functions";

type Props<T extends BillingFormFields> = BillingFormTexts & {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  renderAddress?: boolean;
  disabled?: boolean;
};

export default function BillingDetailsForm<T extends BillingFormFields>({
  required,
  placeholders,
  patterns,
  labels,
  errors,
  register,
  renderAddress = false,
  disabled,
}: Props<T>) {
  const shouldRenderAddress =
    renderAddress &&
    hasKey(required, "address") &&
    hasKey(placeholders, "address") &&
    hasKey(labels, "address");

  return (
    <>
      <Input
        id="firstName"
        label={labels.firstName}
        name={"firstName" as Path<T>}
        register={register}
        required={required.firstName}
        placeholder={placeholders.firstName}
        errors={errors}
        disabled={disabled}
      />

      <Input
        id="lastName"
        label={labels.lastName}
        name={"lastName" as Path<T>}
        register={register}
        required={required.lastName}
        placeholder={placeholders.lastName}
        errors={errors}
        disabled={disabled}
      />

      <Input
        id="city"
        label={labels.city}
        name={"city" as Path<T>}
        register={register}
        required={required.city}
        placeholder={placeholders.city}
        errors={errors}
        disabled={disabled}
      />

      <Input
        id="country"
        label={labels.country}
        name={"country" as Path<T>}
        register={register}
        required={required.country}
        placeholder={placeholders.country}
        errors={errors}
        disabled={disabled}
      />
      {shouldRenderAddress && (
        <Input
          id="address"
          label={labels.address}
          name={"address" as Path<T>}
          register={register}
          required={required.address}
          placeholder={placeholders.address}
          errors={errors}
          disabled={disabled}
        />
      )}

      <Input
        id="numericalCode"
        label={labels.numericalCode}
        name={"numericalCode" as Path<T>}
        register={register}
        required={required.numericalCode}
        placeholder={placeholders.numericalCode}
        errors={errors}
        registerOptions={{
          pattern: {
            value: /^\d+$/,
            message: patterns.numericalCode,
          },
        }}
        disabled={disabled}
      />

      <Input
        id="email"
        label={labels.email}
        name={"email" as Path<T>}
        register={register}
        required={required.email}
        placeholder={placeholders.email}
        errors={errors}
        registerOptions={{
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: patterns.email,
          },
        }}
        disabled={disabled}
      />

      <Input
        id="phoneNumber"
        label={labels.phoneNumber}
        name={"phoneNumber" as Path<T>}
        register={register}
        required={required.phoneNumber}
        placeholder={placeholders.phoneNumber}
        errors={errors}
        registerOptions={{
          pattern: {
            value: /^\d+$/,
            message: patterns.phoneNumber,
          },
        }}
        disabled={disabled}
      />
    </>
  );
}
