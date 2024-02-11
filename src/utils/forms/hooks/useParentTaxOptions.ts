import { OptionWithId, TaxField } from "@/types/forms/reusable";
import { AmountFiled, PartialPayField } from "@/types/forms/amount";
import {
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Args<T extends AmountFiled & PartialPayField & TaxField> {
  watch: UseFormWatch<T>;
  entityId: Path<T>;
  setValue: UseFormSetValue<T>;
}

export default function useParentTaxOptions<
  K extends OptionWithId,
  T extends AmountFiled & PartialPayField & TaxField,
>({
  watch,
  entityId,
  setValue,
}: Args<T>): [K | undefined, Dispatch<SetStateAction<K | undefined>>, boolean] {
  const amountId = "amount" as Path<T>;
  const partialPayValue = watch("partialPay" as Path<T>);
  const amountValue = watch(amountId);
  const disabled = !watch(entityId) || !watch("taxId" as Path<T>);

  const [selectedEntityTaxOption, setSelectedEntityTaxOption] = useState<K>();

  useEffect(() => {
    if (
      partialPayValue &&
      selectedEntityTaxOption &&
      amountValue === selectedEntityTaxOption.value
    ) {
      setValue(amountId, 100 as PathValue<T, Path<T>>);
    }
  }, [amountValue, partialPayValue, selectedEntityTaxOption, setValue]);

  useEffect(() => {
    if (!partialPayValue && selectedEntityTaxOption) {
      setValue(
        amountId,
        selectedEntityTaxOption.value as PathValue<T, Path<T>>,
      );
    }
  }, [partialPayValue, selectedEntityTaxOption, setValue]);

  return [selectedEntityTaxOption, setSelectedEntityTaxOption, disabled];
}
