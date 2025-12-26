"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import { useAction } from "next-safe-action/hooks";

import {
  FieldError,
  Path,
  PathValue,
  Resolver,
  useForm,
  UseFormClearErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";

import Decimal from "decimal.js-light";

import { Locale } from "@/i18n/routing";
import Select from "@/components/forms/common/select";
import { Currency, StudyCycle } from "@/generated/prisma/enums";
import Checkbox from "@/components/forms/common/checkbox";

import { initiateAdmissionTaxPaymentAction } from "../actions";
import { InitiateAdmissionTaxPaymentInputSchema, inputSchema } from "../schema";

type Props = {
  locale: Locale;
  studyCycle: StudyCycle;
  faculties: {
    id: number;
    nameRo: string;
    nameEn: string;
    facultyTaxValues: {
      value: string;
      currency: Currency;
    }[];
  }[];
};

function formatTaxValue(value: Number | Decimal) {
  return value.toFixed(2).replace(".", ",");
}

const AdmissionTaxForm = ({ locale, studyCycle, faculties }: Props) => {
  // Translation message hooks
  const commonT = useTranslations("Common");
  const formsT = useTranslations("Common.Forms");
  const t = useTranslations("AdmissionTaxes");

  const { execute, status, result } = useAction(
    initiateAdmissionTaxPaymentAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          alert(`Success: ${data.success}`);
        }
      },
      onError: ({ error }) => {
        console.error("Server Error:", error);
      },
    },
  );

  const onSubmit = useCallback(
    (data: InitiateAdmissionTaxPaymentInputSchema) => {
      execute(data as any);
    },
    [],
  );

  const {
    handleSubmit,
    control,
    clearErrors,
    register,
    resetField,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InitiateAdmissionTaxPaymentInputSchema>({
    resolver: zodResolver(
      inputSchema,
    ) as Resolver<InitiateAdmissionTaxPaymentInputSchema>,
    defaultValues: { studyCycle },
  });

  // Cache the list of faculties loaded from the database
  const facultyOptions = useMemo(
    () =>
      faculties.map((faculty) => ({
        value: faculty.id,
        label: locale == "ro" ? faculty.nameRo : faculty.nameEn,
      })),
    [faculties, locale],
  );

  const selectedFacultyId = watch("facultyId");

  // Cache the selected faculty's admission tax value
  const facultyTaxValue = useMemo(() => {
    if (!selectedFacultyId) {
      return null;
    }

    const selectedFaculty = faculties.find(
      (faculty) => faculty.id === selectedFacultyId,
    );
    if (!selectedFaculty) {
      return null;
    }

    if (selectedFaculty.facultyTaxValues.length == 0) {
      return null;
    }

    const facultyTaxValue = selectedFaculty.facultyTaxValues[0];

    return {
      value: new Decimal(facultyTaxValue.value),
      currency: facultyTaxValue.currency,
    };
  }, [faculties, selectedFacultyId]);

  const partialPayment = watch("partialPayment");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-prose mx-auto">
      <input type="hidden" {...register("studyCycle")} />
      <div className="my-3">
        <Select
          control={control}
          name="facultyId"
          label={formsT("faculty")}
          options={facultyOptions}
          isClearable
          placeholder={formsT("facultySelectPlaceholder")}
        />
      </div>
      {selectedFacultyId &&
        (facultyTaxValue ? (
          <>
            {/* Display the full value of the admission tax. */}
            <div className="my-3">
              <span>{formsT("taxValue")}:</span>{" "}
              {formatTaxValue(facultyTaxValue.value)} {facultyTaxValue.currency}
            </div>

            <div className="my-3">
              {/* Allow the candidate to pay only a part of the full tax. */}
              <Checkbox
                {...register("partialPayment")}
                label={formsT("partialPayment.checkboxLabel")}
              />

              {partialPayment && (
                <PartialPaymentWidget
                  register={register}
                  clearErrors={clearErrors}
                  resetField={resetField}
                  setError={setError}
                  setValue={setValue}
                  watch={watch}
                  error={errors.partialPaymentValue}
                  totalValue={facultyTaxValue.value}
                  currency={facultyTaxValue.currency}
                />
              )}
            </div>

            <div className="my-3">
              {/* Allow the candidate to pay using the didactic bonus card. */}
              <Checkbox
                {...register("didacticCardPayment")}
                name="didacticCardPayment"
                label={formsT("didacticCardPaymentCheckboxLabel")}
              />
            </div>

            <section>
              <header>
                <h2>{formsT("billingFields")}</h2>
              </header>
              <p className="text-gray-600 m-5">TO DO</p>
            </section>

            <input
              type="submit"
              value={formsT("initiatePaymentProcess")}
              className="bg-slate-300 text-blue-900 font-semibold border-2 rounded-lg text-lg px-4 py-2 cursor-pointer hover:bg-slate-400 hover:text-blue-800 active:bg-slate-500 disabled:bg-slate-50 disabled:text-blue-400"
            />
          </>
        ) : (
          <p className="my-3">
            {commonT("error")}: {t("admissionTaxNotConfigured")}.
          </p>
        ))}
    </form>
  );
};

/// Minimum partial payment value (in any currency)
const MINIMUM_PAYMENT: number = 100;

const PartialPaymentWidget = <
  TFieldValues extends { partialPaymentValue?: number },
  TName extends Path<TFieldValues> & "partialPaymentValue",
>({
  clearErrors,
  register,
  resetField,
  setError,
  setValue,
  watch,
  totalValue,
  currency,
  error,
}: {
  clearErrors: UseFormClearErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  totalValue: Decimal;
  currency: Currency;
  error?: FieldError;
}) => {
  const totalValueAsNumber = useMemo(() => totalValue.toNumber(), [totalValue]);
  const [textValue, setTextValue] = useState(formatTaxValue(totalValue));

  const commonT = useTranslations("Common");
  const t = useTranslations("Common.Forms.partialPayment");

  // Reset inputs when the total value changes (for example, when the user selects another faculty)
  useEffect(() => {
    resetField("partialPaymentValue" as TName, {
      defaultValue: totalValueAsNumber as PathValue<TFieldValues, TName>,
    });
    setTextValue(formatTaxValue(totalValue));
  }, [totalValueAsNumber, totalValue]);

  return (
    <div className="my-3">
      <div className="flex flex-row items-center">
        <label id="partial-payment-label">{t("inputsLabel")}:</label>
        <input
          {...register("partialPaymentValue" as TName, {
            valueAsNumber: true,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setTextValue(formatTaxValue(new Decimal(event.target.value)));
            },
          })}
          type="range"
          min={100}
          max={totalValueAsNumber}
          step="0.01"
          aria-labelledby="partial-payment-label"
          aria-invalid={!!error}
          className="mx-3"
        />
        <span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*,?[0-9]{0,2}"
            min={100}
            value={textValue}
            max={totalValueAsNumber}
            step="0.01"
            aria-labelledby="partial-payment-label"
            aria-invalid={!!error}
            onChange={(event) => {
              clearErrors("partialPaymentValue" as TName);

              const newTextValue = event.target.value;
              setTextValue(newTextValue);

              const newValue = Number(newTextValue.replace(",", "."));
              if (newTextValue.includes(".") || isNaN(newValue)) {
                setError("partialPaymentValue" as TName, {
                  type: "manual",
                  message: t("errors.invalidValue"),
                });
                return;
              } else if (newValue < MINIMUM_PAYMENT) {
                setError("partialPaymentValue" as TName, {
                  type: "manual",
                  message: t("errors.lessThanMinimum", {
                    minimumValue: MINIMUM_PAYMENT,
                    currency,
                  }),
                });
              } else if (newValue > totalValueAsNumber) {
                setError("partialPaymentValue" as TName, {
                  type: "manual",
                  message: t("errors.greaterThanTotalValue", {
                    totalValue: totalValueAsNumber,
                    currency,
                  }),
                });
              }

              setValue(
                "partialPaymentValue" as TName,
                newValue as PathValue<TFieldValues, TName>,
              );
            }}
            className="w-20"
          />{" "}
          {currency}
        </span>
      </div>
      {error && error.message && (
        <p className="mt-1 text-red-500">
          {commonT("error")}: {error?.message}
        </p>
      )}
    </div>
  );
};

export default AdmissionTaxForm;
