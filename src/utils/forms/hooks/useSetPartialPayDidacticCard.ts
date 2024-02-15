import { PartialPayField } from "@/types/forms/amount";
import { DidacticFormFields } from "@/types/forms/faculties";
import { useEffect } from "react";
import {
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Args<T extends DidacticFormFields & PartialPayField> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

export default function useSetPartialPayDidacticCard<
  T extends DidacticFormFields & PartialPayField,
>({ setValue, watch }: Args<T>): [boolean | undefined] {
  const partialPay = "partialPay" as Path<T>;
  const didacticPremiumCardOnly = "didacticPremiumCardOnly" as Path<T>;
  const didacticPremiumCardOnlyValue = watch(didacticPremiumCardOnly);

  useEffect(() => {
    if (didacticPremiumCardOnlyValue) {
      setValue(partialPay, true as PathValue<T, Path<T>>);
    }
  }, [
    watch,
    setValue,
    didacticPremiumCardOnly,
    partialPay,
    didacticPremiumCardOnlyValue,
  ]);

  return [didacticPremiumCardOnlyValue];
}
