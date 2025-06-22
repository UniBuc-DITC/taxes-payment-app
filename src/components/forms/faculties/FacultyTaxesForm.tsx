import React, { useEffect, useMemo } from "react";
import { Control, UseFormWatch, UseFormSetValue, Path } from "react-hook-form";
import {
  FacultyOption,
  FacultyTaxOption,
  FacultyTaxesAmountFields,
  FacultyTaxesTexts,
} from "@/types/forms/faculties";
import useSetEntityTaxOption from "@/utils/forms/hooks/useSetEntityTaxOption";
import ControlledSelect from "@/components/controlled-select";

/**
 * `FacultyTaxesForm` is a React component that renders a part of a form
 * for selecting faculties and their respective tax options.
 *
 * Props:
 *
 * @prop {Control<T>} control - Control object from `react-hook-form`, used for managing the form state.
 * @prop {FacultyOption[]} facultyOptions - An array of `FacultyOption` objects for faculty selection.
 * @prop {Record<string, FacultyTaxOption[]>} taxesOptions - A record mapping faculty IDs to their corresponding tax options.
 * @prop {React.Dispatch<React.SetStateAction<FacultyTaxOption | undefined>>} [setTaxesOptionParent] - An optional function to set the selected tax option in a parent component (nedeed when the amount is variable and it's managed by the `AmountForm` component).
 * @prop {boolean} [isAmountVariable=false] - Optional boolean to indicate if the amount is variable. Defaults to `false`.If the amount it's not variable this component will handle the amount value, if the amount is variable the amount value will be handeled by the `AmountForm` component.
 * @prop {FacultyTaxesTexts} - Text labels and validation messages for various form fields.
 * @prop {UseFormWatch<T>} watch - Function from `react-hook-form` to watch the form state.
 * @prop {FieldErrors<T>} errors - Error object from `react-hook-form` containing the form errors.
 * @prop {UseFormSetValue<T>} setValue - Function from `react-hook-form` to set the form state.
 *
 * Usage:
 * This component should be used within a form that is wrapped with `FormProvider` from `react-hook-form` with an input data type that can extend `FacultyTaxesAmountFields`.
 */

type FacultyTaxesFormProps<TFieldValues extends FacultyTaxesAmountFields> = {
  facultyOptions: FacultyOption[];
  taxesOptions: Record<string, FacultyTaxOption[]>;
  setTaxesOptionParent?: React.Dispatch<
    React.SetStateAction<FacultyTaxOption | undefined>
  >;
  partialPay: boolean;
  control: Control<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
} & FacultyTaxesTexts;

function FacultyTaxesForm<TFieldValues extends FacultyTaxesAmountFields>({
  facultyOptions,
  taxesOptions,
  required,
  labels,
  extraTaxOptions,
  setTaxesOptionParent,
  partialPay,
  control,
  watch,
  setValue,
}: FacultyTaxesFormProps<TFieldValues>) {
  const facultyId = "facultyId" as Path<TFieldValues>;
  const taxId = "taxId" as Path<TFieldValues>;

  const selectedFaculty = watch(facultyId) as string;

  const [selectedFacultyTaxOption, setSelectedEntityTaxOption, setTaxesOption] =
    useSetEntityTaxOption({
      setValue,
      watch,
      selectedEntityId: selectedFaculty,
      taxesOptions,
      setTaxesOptionParent,
      partialPay,
    });

  const selectFacultyOptions = useMemo(
    () =>
      facultyOptions.map(({ id, label }) => ({ value: id.toString(), label })),
    [facultyOptions],
  );

  const selectTaxOptions = useMemo(
    () =>
      !selectFacultyOptions
        ? []
        : taxesOptions[selectedFaculty]?.map(({ id, label }) => ({
            value: id.toString(),
            label,
          })),
    [selectFacultyOptions, selectedFaculty, taxesOptions],
  );

  const taxIdValue = watch(taxId) as string;

  useEffect(() => setTaxesOption(taxIdValue), [setTaxesOption, taxIdValue]);

  return (
    <>
      <div className="relative">
        <label htmlFor="faculty" className="text-sm font-medium text-gray-700">
          {labels.facultyId}
        </label>
        <ControlledSelect
          name={facultyId}
          placeholder={extraTaxOptions.faculty}
          control={control}
          defaultValue={selectedFaculty as any}
          rules={{ required: required.facultyId }}
          options={selectFacultyOptions as any}
        />
      </div>
      <div className="relative">
        <label htmlFor="tax" className="text-sm font-medium text-gray-700">
          {labels.taxId}
        </label>
        <ControlledSelect
          name={taxId}
          placeholder={
            !selectedFaculty
              ? extraTaxOptions.tax
              : extraTaxOptions.noFacultyTaxes
          }
          control={control}
          defaultValue={selectedFacultyTaxOption?.value?.toString() as any}
          rules={{ required: required.taxId }}
          disabled={!selectedFaculty}
          options={selectTaxOptions as any}
        />
      </div>
    </>
  );
}

export default FacultyTaxesForm;
