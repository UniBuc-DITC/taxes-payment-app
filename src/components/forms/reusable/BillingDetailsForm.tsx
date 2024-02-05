import {
  BillingFormFields,
  BillingFormTexts,
} from "@/types/forms/billingDetails";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import Input from "./Input";

type Props<T extends BillingFormFields> = BillingFormTexts & {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function BillingDetailsForm<T extends BillingFormFields>({
  required,
  placeholders,
  patterns,
  labels,
  errors,
  register,
}: Props<T>) {
  return (
    <>
      <Input<T>
        id="firstName"
        label={labels.firstName}
        name={"firstName" as Path<T>}
        register={register}
        required={required.firstName}
        placeholder={placeholders.firstName}
        errors={errors}
      />

      <Input<T>
        id="lastName"
        label={labels.lastName}
        name={"lastName" as Path<T>}
        register={register}
        required={required.lastName}
        placeholder={placeholders.lastName}
        errors={errors}
      />

      <Input<T>
        id="city"
        label={labels.city}
        name={"city" as Path<T>}
        register={register}
        required={required.city}
        placeholder={placeholders.city}
        errors={errors}
      />

      <Input<T>
        id="country"
        label={labels.country}
        name={"country" as Path<T>}
        register={register}
        required={required.country}
        placeholder={placeholders.country}
        errors={errors}
      />

      <Input<T>
        id="address"
        label={labels.address}
        name={"address" as Path<T>}
        register={register}
        required={required.address}
        placeholder={placeholders.address}
        errors={errors}
      />

      <Input<T>
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
      />

      <Input<T>
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
      />

      <Input<T>
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
      />
    </>
  );
}
