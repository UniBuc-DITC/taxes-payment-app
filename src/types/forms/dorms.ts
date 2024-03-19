import { Prisma } from "@prisma/client";
import { InputBaseTexts, OptionWithId, TaxField } from "./reusable";
import { BillingFormFields, BillingFormTexts } from "./billingDetails";
import { MonthSelectTexts } from "./month";
import { SubmitButtonTexts } from "./submitBtn";
import {
  ConsentFormFiles,
  ReCAPTCHAInput,
  ReCAPTCHATexts,
  RequiredCheckboxTexts,
} from "./agreements";
import { AmountFiled, AmountTexts, PartialPayField } from "./amount";

export interface DormRoomNumberTexts extends InputBaseTexts {
  required: string;
  placeholder: string;
  pattern: string;
}

export interface DormRoomNumberField {
  dormRoomNumber: number;
}

/**
 * Extended Studnet Dorms type including associated student dorm tax values.
 */
export type DormWithTax = Prisma.StudentDormGetPayload<{
  include: { studentDormTaxValues: true };
}>;

/**
 * Options for selecting student dorm tax.
 */
export interface DormTaxOption extends OptionWithId {}

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

/**
 * Type definition for student dorm taxes fields in forms.
 */
export type AccommodationTaxesFields = TaxField & {
  dormId: string;
};

export interface AccommodationTaxesAmountFields
  extends AccommodationTaxesFields,
    PartialPayField,
    AmountFiled {}

/**
 * Text properties for student dorm taxes form, including labels,required messaged and extra options.
 */
export type DormTaxesTexts = {
  required: AccommodationTaxesFields;
  labels: AccommodationTaxesFields;
  extraTaxOptions: {
    dorm: string;
    tax: string;
    noDormTaxes: string;
  };
};
/**
 * Text properties and options for the dorms form.
 */
export interface AccommodationTaxFormTexts {
  billingTexts: BillingFormTexts;
  dormTaxesTexts: DormTaxesTexts;
  monthTexts: MonthSelectTexts;
  submitTexts: SubmitButtonTexts;
  agreeTexts: RequiredCheckboxTexts;
  acceptEuPlatescTexts: RequiredCheckboxTexts;
  recaptchaTexts: ReCAPTCHATexts;
  variableAmountTexts: AmountTexts;
  partialPayTexts: InputBaseTexts;
  dormRoomNumberTexts: DormRoomNumberTexts;
}

/**
 * Input fields for the dorms form.
 */
export interface AccommodationTaxFormData
  extends Omit<BillingFormFields, "address">,
    AccommodationTaxesFields,
    ConsentFormFiles,
    ReCAPTCHAInput,
    PartialPayField,
    AmountFiled,
    DormRoomNumberField {
  month: string;
}
