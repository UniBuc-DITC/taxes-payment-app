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
