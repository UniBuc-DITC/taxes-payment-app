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
  F extends AmountFiled & PartialPayField,
  K extends OptionWithId,
> {
  watch: UseFormWatch<F>;
  setValue: UseFormSetValue<F>;
  selectedEntityId: string;
  taxesOptions: Record<string, K[]>;
  partialPay: boolean;
  setTaxesOptionParent?: Dispatch<SetStateAction<K | undefined>> | undefined;
}

export default function useSetEntityTaxOption<
  F extends AmountFiled & PartialPayField,
  K extends OptionWithId,
>({
  setValue,
  watch,
  selectedEntityId,
  taxesOptions,
  setTaxesOptionParent,
  partialPay,
}: Args<F, K>): [
  K | undefined,
  Dispatch<SetStateAction<K | undefined>>,
  (selectedId: string) => void,
] {
  const [selectedEntityTaxOption, setSelectedEntityTaxOption] = useState<K>();

  const taxId = "taxId" as Path<F>;
  const amount = "amount" as Path<F>;

  const selectedTax = watch(taxId)?.valueOf()?.toString();
  const selctedAmount = Number(watch(amount)?.valueOf()?.toString());

  useEffect(() => {
    if (selectedTax && selectedEntityTaxOption) {
      const maxAmount = selectedEntityTaxOption?.value;
      if (Number(selctedAmount) >= maxAmount) {
        setValue(amount, maxAmount as PathValue<F, Path<F>>);
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
        setValue(amount, st?.value as PathValue<F, Path<F>>);
      }
    } else {
      setSelectedEntityTaxOption(undefined);
      if (setTaxesOptionParent) {
        setTaxesOptionParent(undefined);
      }
      if (!partialPay) {
        setValue(amount, 0 as PathValue<F, Path<F>>);
      }
    }
  };

  return [selectedEntityTaxOption, setSelectedEntityTaxOption, setTaxesOption];
}
