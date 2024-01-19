/**
 * Field for amount in forms.
 */
export type AmountField = { amount: string };
/**
 * Text properties for the amount form, including labels and validation rules.
 */
export type AmountTexts = {
  required: AmountField;
  labels: AmountField;
  validate: {
    amount: string;
  };
};
