import { Prisma, StudyCycle } from "@prisma/client";
import { Option } from "./reusable";

/**
 * Extended Faculty type including associated faculty tax values.
 */
export type FacultyWithTax = Prisma.FacultyGetPayload<{
  include: { facultyTaxValues: true };
}>;

/**
 * Options for selecting faculty tax, including the study cycle.
 */
export interface FacultyTaxOption extends Option {
  id: number;
  studyCycle: StudyCycle;
}

/**
 * Options for selecting a faculty.
 */
export interface FacultyOption {
  id: number;
  label: string;
}

/**
 * Keys for faculty tax related form fields.
 */
type FacultyFormKeys = "faculty" | "tax";

/**
 * Type definition for faculty taxes fields in forms.
 */
export type FacultyTaxesFields = Record<FacultyFormKeys, string>;

/**
 * Text properties for faculty taxes form, including labels and extra options.
 */
export type FacultyTaxesTexts = {
  required: FacultyTaxesFields;
  labels: FacultyTaxesFields;
  extraTaxOptions: {
    faculty: string;
    tax: string;
    noFacultyTaxes: string;
  };
};

/**
 * Type definition for faculty taxes amount fields in forms.
 */
export interface FacultyTaxesAmountFields extends FacultyTaxesFields {
  amount: number;
}
