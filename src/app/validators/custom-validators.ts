import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Validator for the math question (2+2 = 4)
  static mathValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value !== null && value !== 4) {
      return { mathError: true };
    }
    return null;
  }

  // Validator to ensure text doesn't contain the letter 'a'
  static noLetterAValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value === 'string' && value.toLowerCase().includes('a')) {
      return { containsA: true };
    }
    return null;
  }

  // Validator for minimum length
  static minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.length < minLength) {
        return { minLength: { actualLength: value.length, requiredLength: minLength } };
      }
      return null;
    };
  }
}
