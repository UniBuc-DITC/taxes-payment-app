import { ReactNode } from "react";

/**
 * Text properties for required checkbox, including terms and required message.
 */
export interface RequiredCheckboxTexts {
  terms: string | ReactNode;
  required: string;
}

/**
 * Fields for agreement forms agreeing to terms and Eu Platesc.
 */
export interface EuPlatescFormFields {
  acceptEuPlatesc: boolean;
}
export interface AgreeTermsFormFiles {
  agreeToTerms: boolean;
}
export interface AgreeFormFiles
  extends EuPlatescFormFields,
    AgreeTermsFormFiles {}
