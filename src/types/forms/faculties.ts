import { Prisma, StudyCycle } from "@prisma/client";
import { InputBaseTexts, OptionWithId, TaxField } from "./reusable";
import { BillingFormFields, BillingFormTexts } from "./billingDetails";
import { SubmitButtonTexts } from "./submitBtn";
import {
  ConsentFormFiles,
  ReCAPTCHAInput,
  ReCAPTCHATexts,
  RequiredCheckboxTexts,
} from "./agreements";
import { AmountFiled, AmountTexts, PartialPayField } from "./amount";

/**
 * Extended Faculty type including associated faculty tax values.
 */
export type FacultyWithTax = Prisma.FacultyGetPayload<{
  include: { facultyTaxValues: true };
}>;

/**
 * Options for selecting faculty tax, including the study cycle.
 */
export interface FacultyTaxOption extends OptionWithId {
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
 * Type definition for faculty taxes fields in forms.
 */
export type FacultyTaxesFields = TaxField & {
  facultyId: string;
};

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
export interface FacultyTaxesAmountFields
  extends FacultyTaxesFields,
    AmountFiled,
    PartialPayField {}

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
  billingTexts: BillingFormTexts;
  facultyTaxesTexts: FacultyTaxesTexts;
  submitTexts: SubmitButtonTexts;
  agreeTexts: RequiredCheckboxTexts;
  acceptEuPlatescTexts: RequiredCheckboxTexts;
  recaptchaTexts: ReCAPTCHATexts;
  variableAmountTexts: AmountTexts;
  partialPayTexts: InputBaseTexts;
}

/**
 * Input fields for the admission form.
 */
export interface AdmissionTaxFormData
  extends BillingFormFields,
    ConsentFormFiles,
    FacultyTaxesFields,
    ReCAPTCHAInput,
    PartialPayField,
    AmountFiled {}

// ---------- Tuition Form Types ----------

/**
 * Text properties for the didactic premium card section in tuition forms.
 */
export interface DidacticPremiumCardTexts {
  text: string;
}
export interface DidacticFormFields {
  didacticPremiumCardOnly: boolean;
}

/**
 * Text properties and options for the tuition form.
 */
export interface TuitionFormTexts extends AdmissionFormTexts {
  didacticPremiumCardText: DidacticPremiumCardTexts;
}

/**
 * Input fields for the tuition form.
 */
export interface TuitionTaxFormData
  extends AdmissionTaxFormData,
    DidacticFormFields {}
