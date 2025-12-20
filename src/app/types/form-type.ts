import { FormControl } from '@angular/forms';

export type FormModel<T> = {
  [key in keyof T]: FormControl<T[key]>;
};

export type MultiSelectOption = {
  label: string;
  value: number;
};

export type DateRangePicker = [Date | null, Date | null];
