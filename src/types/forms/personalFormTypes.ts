/**
 * Keys for fields that contain additional personal information.
 */
export type PersonalExtraInfoKeys = "email" | "phoneNumber" | "numericalCode";

/**
 * All keys for personal information fields in forms.
 */
export type PersonalInfoKeys =
  | PersonalExtraInfoKeys
  | "firstName"
  | "lastName"
  | "city"
  | "country"
  | "address";

/**
 * Type definition for personal form fields.
 */
export type PersonalFormFields = Record<PersonalInfoKeys, string>;

/**
 * Type definition for pattern validation fields in personal form.
 */
export type PersonalFormPatternFields = Record<PersonalExtraInfoKeys, string>;

/**
 * Text properties for personal form, including placeholders, labels, and validation patterns.
 */
export type PersonalFormTexts = {
  placeholders: PersonalFormFields;
  required: PersonalFormFields;
  labels: PersonalFormFields;
  patterns: PersonalFormPatternFields;
};
