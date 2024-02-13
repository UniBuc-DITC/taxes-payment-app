/**
 * Text for amount.
 */
export type AmountText = { amount: string };
/**
 * Field for amount in forms.
 */
export type AmountFiled = { amount: number };
/**
 * Text properties for the amount form, including labels and validation rules.
 */
export type AmountTexts = {
  required: AmountText;
  labels: AmountText;
  validate: {
    amount: string;
  };
};
export interface PartialPayField {
  partialPay: boolean;
}
