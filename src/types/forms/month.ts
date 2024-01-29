/**
 * Options for selecting a month.
 */
export type MonthOption = {
  value: string;
  label: string;
};

/**
 * Text properties for month selection form fields.
 */
export interface MonthSelectTexts {
  label: string;
  extra?: string;
  noMonth: string;
  required: string;
  monthOptions: MonthOption[];
}

/**
 * Field type for representing a selected month in forms.
 */
export interface MonthField {
  month: string;
}
