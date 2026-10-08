import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minSelectedItems(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (Array.isArray(value) && value.length >= min) {
      return null;
    }
    return {
      minSelected: {
        required: min,
        actual: Array.isArray(value) ? value.length : 0,
      },
    };
  };
}
