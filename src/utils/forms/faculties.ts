/**
 *
 * @remarks The labels int this methods are just a placeholder for when we the full ui
 */

import {
  FacultyOption,
  FacultyTaxOption,
  FacultyWithTax,
} from "@/types/forms/faculties";

export function createFacultyTaxOptions(
  faculties: FacultyWithTax[],
  locale: string,
) {
  const isEnglish = locale === "en";
  return faculties.reduce(
    (acc, { id, nameEn, nameRo, facultyTaxValues }) => {
      if (facultyTaxValues.length === 0) return acc;
      acc.facultyOptions.push({
        id,
        label: isEnglish ? nameEn : nameRo,
      });
      acc.taxesOptions[id.toString()] = facultyTaxValues.map(
        ({ id, value, remarksEn, remarksRo, studyCycle }) => ({
          id,
          value: Number(value),
          label: `${value} ${isEnglish ? remarksEn || "" : remarksRo || ""}`,
          studyCycle,
        }),
      );
      return acc;
    },
    {
      facultyOptions: [],
      taxesOptions: {},
    } as {
      facultyOptions: FacultyOption[];
      taxesOptions: Record<string, FacultyTaxOption[]>;
    },
  );
}
