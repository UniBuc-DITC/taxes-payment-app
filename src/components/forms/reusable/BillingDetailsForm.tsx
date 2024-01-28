import {
  BillingFormFields,
  BillingFormTexts,
} from "@/types/forms/billingDetails";
import { useFormContext } from "react-hook-form";
import Input from "./Input";

export default function BillingDetailsForm({
  required,
  placeholders,
  patterns,
  labels,
}: BillingFormTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BillingFormFields>();

  return (
    <>
      <Input<BillingFormFields>
        id="firstName"
        label={labels.firstName}
        name={"firstName"}
        register={register}
        required={required.firstName}
        placeholder={placeholders.firstName}
        errors={errors}
      />

      <Input<BillingFormFields>
        id="lastName"
        label={labels.lastName}
        name={"lastName"}
        register={register}
        required={required.lastName}
        placeholder={placeholders.lastName}
        errors={errors}
      />

      <Input<BillingFormFields>
        id="city"
        label={labels.city}
        name={"city"}
        register={register}
        required={required.city}
        placeholder={placeholders.city}
        errors={errors}
      />

      <Input<BillingFormFields>
        id="country"
        label={labels.country}
        name={"country"}
        register={register}
        required={required.country}
        placeholder={placeholders.country}
        errors={errors}
      />

      <Input<BillingFormFields>
        id="address"
        label={labels.address}
        name={"address"}
        register={register}
        required={required.address}
        placeholder={placeholders.address}
        errors={errors}
      />

      <Input<BillingFormFields>
        id="numericalCode"
        label={labels.numericalCode}
        name={"numericalCode"}
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

      <Input<BillingFormFields>
        id="email"
        label={labels.email}
        name={"email"}
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

      <Input<BillingFormFields>
        id="phoneNumber"
        label={labels.phoneNumber}
        name={"phoneNumber"}
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
