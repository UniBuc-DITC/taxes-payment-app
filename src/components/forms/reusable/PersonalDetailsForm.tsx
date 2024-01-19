import { PersonalFormTexts } from "@/types/forms/personalDetails";
import { useFormContext } from "react-hook-form";

export default function PersonalDetailsForm({
  required,
  placeholders,
  patterns,
  labels,
}: PersonalFormTexts) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="relative">
        <label
          htmlFor="firstName"
          className="text-sm font-medium text-gray-700"
        >
          {labels.firstName}
        </label>
        <input
          {...register("firstName", { required: required.firstName })}
          id="firstName"
          aria-label="First Name"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
          placeholder={placeholders.firstName}
        />
        {errors.firstName && (
          <span
            className={`text-xs text-red-500 ${
              errors.firstName ? "block" : "hidden"
            }`}
          >
            {errors.firstName.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
          {labels.lastName}
        </label>
        <input
          {...register("lastName", { required: required.lastName })}
          id="lastName"
          aria-label="Last Name"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
          placeholder={placeholders.lastName}
        />
        {errors.lastName && <p>{errors.lastName.message?.toString()}</p>}
        {errors.lastName && (
          <span
            className={`text-xs text-red-500 ${
              errors.lastName ? "block" : "hidden"
            }`}
          >
            {errors.lastName.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="city" className="text-sm font-medium text-gray-700">
          {labels.city}
        </label>
        <input
          {...register("city", { required: required.city })}
          id="city"
          aria-label="City"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 `}
          placeholder={placeholders.city}
        />

        {errors.city && (
          <span
            className={`text-xs text-red-500 ${
              errors.city ? "block" : "hidden"
            }`}
          >
            {errors.city.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="country" className="text-sm font-medium text-gray-700">
          {labels.country}
        </label>
        <input
          {...register("country", { required: required.country })}
          id="country"
          aria-label="Country"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
          placeholder={placeholders.country}
        />

        {errors.country && (
          <span
            className={`text-xs text-red-500 ${
              errors.country ? "block" : "hidden"
            }`}
          >
            {errors.country.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">
          {labels.address}
        </label>
        <input
          {...register("address", { required: required.address })}
          placeholder={placeholders.address}
          id="address"
          aria-label="Address"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
        />

        {errors.address && (
          <span
            className={`text-xs text-red-500 ${
              errors.address ? "block" : "hidden"
            }`}
          >
            {errors.address.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="numericalCode"
          className="text-sm font-medium text-gray-700"
        >
          {labels.numericalCode}
        </label>
        <input
          type="text"
          {...register("numericalCode", {
            required: required.numericalCode,
            pattern: {
              value: /^\d+$/,
              message: patterns.numericalCode,
            },
          })}
          id="numericalCode"
          aria-label="NumericalCode"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
          placeholder={placeholders.numericalCode}
        />

        {errors.numericalCode && (
          <span
            className={`text-xs text-red-500 ${
              errors.numericalCode ? "block" : "hidden"
            }`}
          >
            {errors.numericalCode.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          {labels.email}
        </label>
        <input
          {...register("email", {
            required: required.email,
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: patterns.email,
            },
          })}
          placeholder={placeholders.email}
          id="email"
          aria-label="Email"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
        />

        {errors.email && (
          <span
            className={`text-xs text-red-500 ${
              errors.email ? "block" : "hidden"
            }`}
          >
            {errors.email.message?.toString()}
          </span>
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700"
        >
          {labels.phoneNumber}
        </label>
        <input
          {...register("phoneNumber", {
            required: required.phoneNumber,
            pattern: {
              value: /^\d+$/,
              message: patterns.phoneNumber,
            },
          })}
          placeholder={placeholders.phoneNumber}
          id="phoneNumber"
          aria-label="PhoneNumber"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 outline-none focus:outline-blue-200 "
        />

        {errors.phoneNumber && (
          <span
            className={`text-xs text-red-500 ${
              errors.phoneNumber ? "block" : "hidden"
            }`}
          >
            {errors.phoneNumber.message?.toString()}
          </span>
        )}
      </div>
    </>
  );
}
