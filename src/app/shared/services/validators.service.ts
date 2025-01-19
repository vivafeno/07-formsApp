import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  // Pattern para validar nombre y apellido o apellidos
  public firstNameAndLastnamePatern: string =
    '^([a-zA-ZáéíóúÁÉÍÓÚüÜçÇ]+)( [a-zA-ZáéíóúÁÉÍÓÚüÜçÇ]+)+$';

  // Pattern para validar email
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualToFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      if (field1Value !== field2Value) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }
}
