import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  standalone: false,

  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
  ) {
    this.myForm = this.fb.group({
      name : ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePatern)]],
      // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ new EmailValidator()]],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ this.emailValidator]],
      username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    }, {
      // Validators a nivel de formulario
      validators: [this.validatorsService.isFieldOneEqualToFieldTwo('password', 'password2')]
    });
  };


isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
}

  onSubmit(): void {

    if (this.myForm.invalid) {
      console.log('Formulario no valido');
      this.myForm.markAllAsTouched();
      return;
    }    
    console.log(this.myForm.value);
  }


  
}
