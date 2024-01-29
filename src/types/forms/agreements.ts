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
  consentEuPlatesc: boolean;
}
export interface ConsentFormFields {
  consentToTerms: boolean;
}
export interface AgreeFormFiles
  extends EuPlatescFormFields,
    ConsentFormFields {}

/**
 * Fields for reCAPTCHA
 */

export interface ReCAPTCHAInput {
  recaptcha: string;
}
export interface ReCAPTCHAResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export interface ReCAPTCHATexts {
  required: string;
  validate: string;
}
