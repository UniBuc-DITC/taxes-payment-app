export interface Option {
  value: number;
  label: string;
}

export interface OptionWithId extends Option {
  id: number;
}

export interface InputBaseTexts {
  label: string;
}

export interface TaxField {
  taxId: string;
}
