import { Prisma } from "@prisma/client";
import { Option } from "./reusable";
import { BillingFormFields, BillingFormTexts } from "./billingDetails";
import { MonthTexts } from "./month";
import { SubmitButtonTexts } from "./submitBtn";
import {
  AgreeFormFiles,
  ReCAPTCHAInput,
  ReCAPTCHATexts,
  RequiredCheckboxTexts,
} from "./agreements";

/**
 * Extended Studnet Dorms type including associated student dorm tax values.
 */
export type DormWithTax = Prisma.StudentDormGetPayload<{
  include: { studentDormTaxValues: true };
}>;

/**
 * Options for selecting student dorm tax.
 */
export interface DormTaxOption extends Option {
  id: number;
}

/**
 * Options for selecting a student dorm.
 */
export interface DormOption {
  id: number;
  label: string;
}

/**
 * Keys for student dorm tax related form fields.
 */
type DormsFormKeys = "dormId" | "taxId";

/**
 * Type definition for student dorm taxes fields in forms.
 */
export type DormTaxesFields = Record<DormsFormKeys, string>;

export interface DormTaxesAmountFields extends DormTaxesFields {
  amount: number;
}

/**
 * Text properties for student dorm taxes form, including labels,required messaged and extra options.
 */
export type DormTaxesTexts = {
  required: DormTaxesFields;
  labels: DormTaxesFields;
  extraTaxOptions: {
    dorm: string;
    tax: string;
    noDormTaxes: string;
  };
};
/**
 * Text properties and options for the dorms form.
 */
export interface DormsFormTexts {
  billingTexts: BillingFormTexts;
  dormTaxesTexts: DormTaxesTexts;
  monthTexts: MonthTexts;
  submitTexts: SubmitButtonTexts;
  agreeTexts: RequiredCheckboxTexts;
  acceptEuPlatescTexts: RequiredCheckboxTexts;
  recaptchaTexts: ReCAPTCHATexts;
}

/**
 * Input fields for the dorms form.
 */
export interface DormFormInput
  extends BillingFormFields,
    DormTaxesFields,
    AgreeFormFiles,
    ReCAPTCHAInput {
  month: string;
  amount: number;
}
