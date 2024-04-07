import { AmountFiled, PartialPayField } from "@/types/forms/amount";
import { OptionWithId } from "@/types/forms/reusable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Args<
  K extends OptionWithId,
  T extends AmountFiled & PartialPayField,
> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  selectedEntityId: string;
  taxesOptions: Record<string, K[]>;
  partialPay: boolean;
  setTaxesOptionParent?: Dispatch<SetStateAction<K | undefined>> | undefined;
}

export default function useSetEntityTaxOption<
  K extends OptionWithId,
  T extends AmountFiled & PartialPayField,
>({
  setValue,
  watch,
  selectedEntityId,
  taxesOptions,
  setTaxesOptionParent,
  partialPay,
}: Args<K, T>): [
  K | undefined,
  Dispatch<SetStateAction<K | undefined>>,
  (selectedId: string) => void,
] {
  const [selectedEntityTaxOption, setSelectedEntityTaxOption] = useState<K>();

  const taxId = "taxId" as Path<T>;
  const amount = "amount" as Path<T>;

  const selectedTax = watch(taxId)?.valueOf()?.toString();
  const selctedAmount = Number(watch(amount)?.valueOf()?.toString());

  useEffect(() => {
    if (selectedTax && selectedEntityTaxOption) {
      const maxAmount = selectedEntityTaxOption?.value;
      if (Number(selctedAmount) >= maxAmount) {
        setValue(amount, maxAmount as PathValue<T, Path<T>>);
      }
    }
  }, [selectedTax, selctedAmount, setValue, selectedEntityTaxOption, amount]);

  const setTaxesOption = (selectedId: string) => {
    if (selectedEntityId) {
      const st = taxesOptions[selectedEntityId].find(
        ({ id }) => id.toString() === selectedId,
      );

      setSelectedEntityTaxOption(st);
      if (setTaxesOptionParent) {
        setTaxesOptionParent(st);
      }
      if (!partialPay && st) {
        setValue(amount, st?.value as PathValue<T, Path<T>>);
      }
    } else {
      setSelectedEntityTaxOption(undefined);
      if (setTaxesOptionParent) {
        setTaxesOptionParent(undefined);
      }
      if (!partialPay) {
        setValue(amount, 0 as PathValue<T, Path<T>>);
      }
    }
  };

  return [selectedEntityTaxOption, setSelectedEntityTaxOption, setTaxesOption];
}
