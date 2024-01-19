import { DormOption, DormTaxOption, DormWithTax } from "@/types/forms/dorms";

/**
 *
 * @remarks The labels int this methods are just a placeholder for when we the full ui
 */
export function createDormTaxOptions(dorms: DormWithTax[], locale: string) {
  const isEnglish = locale === "en";
  return dorms.reduce(
    (acc, { id, name, studentDormTaxValues }) => {
      acc.dormOptions.push({
        id,
        label: name,
      });
      acc.taxesOptions[id.toString()] = studentDormTaxValues.map(
        ({ id, value, remarksEn, remarksRo }) => ({
          id,
          value: Number(value),
          label: `${value} ${isEnglish ? remarksEn || "" : remarksRo || ""}`,
        }),
      );
      return acc;
    },
    {
      dormOptions: [],
      taxesOptions: {},
    } as {
      dormOptions: DormOption[];
      taxesOptions: Record<string, DormTaxOption[]>;
    },
  );
}
