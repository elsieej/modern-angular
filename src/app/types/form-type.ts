import { FormControl } from '@angular/forms';

export type FormModel<T> = {
  [key in keyof T]: FormControl<T[key]>;
};
