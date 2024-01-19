import { Prisma, StudyCycle } from "@prisma/client";
import { Option } from "./reusable";
import { PersonalFormFields, PersonalFormTexts } from "./personalDetails";
import { SubmitButtonTexts } from "./submitBtn";
import { AgreeFormFiles, RequiredCheckboxTexts } from "./agreements";
import { AmountTexts } from "./amount";

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

// ---------- Admission Form Types ----------

/**
 * Type definition for faculty taxes amount fields in forms.
 */
export interface FacultyTaxesAmountFields extends FacultyTaxesFields {
  amount: number;
}

/**
 * Text properties and options for the admission form.
 */
export interface AdmissionFormTexts {
  personalTexts: PersonalFormTexts;
  facultyTaxesTexts: FacultyTaxesTexts;
  submitTexts: SubmitButtonTexts;
  agreeTexts: RequiredCheckboxTexts;
  acceptEuPlatescTexts: RequiredCheckboxTexts;
}

/**
 * Input fields for the admission form.
 */
export interface AdmissionFormInput
  extends PersonalFormFields,
    AgreeFormFiles,
    FacultyTaxesFields {
  amount: number;
}

// ---------- Tuition Form Types ----------

/**
 * Text properties for the didactic premium card section in tuition forms.
 */
export interface DidacticPremiumCardTexts {
  text: string;
}
export interface DidacticFormFields {
  didacticPremiumCardOnly: string;
}

/**
 * Text properties and options for the tuition form.
 */
export interface TuitionFormTexts extends AdmissionFormTexts {
  didacticPremiumCardText: DidacticPremiumCardTexts;
  variableAmountTexts: AmountTexts;
}

/**
 * Input fields for the tuition form.
 */
export interface TuitionFormInput extends AdmissionFormInput {
  didacticPremiumCardOnly: boolean;
  partialPay: boolean;
}
