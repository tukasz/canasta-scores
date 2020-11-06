export enum CalculatorFormFieldType {
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
}

export interface CalculatorFormField {
  type: CalculatorFormFieldType;
  label: string;
  description?: string;
  value?: any;
  points: number;
  isSpecial?: boolean;
}
