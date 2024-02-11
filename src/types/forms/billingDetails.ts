/**
 * Keys for fields that contain additional personal information.
 */
export type BillingExtraInfoKeys = "email" | "phoneNumber" | "numericalCode";

/**
 * All keys for personal information fields in forms.
 */
export type BillingInfoKeys =
  | BillingExtraInfoKeys
  | "firstName"
  | "lastName"
  | "city"
  | "country";

/**
 * Type definition for personal form fields.
 */
export type BillingFormFields = Record<BillingInfoKeys, string> & {
  address?: string;
};

/**
 * Type definition for pattern validation fields in personal form.
 */
export type BillingFormPatternFields = Record<BillingExtraInfoKeys, string>;

/**
 * Text properties for personal form, including placeholders, labels, and validation patterns.
 */
export type BillingFormTexts = {
  placeholders: BillingFormFields;
  required: BillingFormFields;
  labels: BillingFormFields;
  patterns: BillingFormPatternFields;
};
