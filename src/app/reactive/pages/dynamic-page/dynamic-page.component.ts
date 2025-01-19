import { Component } from '@angular/core';
import { ValidatorsService } from '../../../shared/services/validators.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  standalone: false,

  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favouriteGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Zelda', Validators.required],
        ['Mario', Validators.required],
      ]),
    });
  }

  public newFavourite: FormControl = new FormControl('', [Validators.required]);

  get favouriteGames() {
    return this.myForm.get('favouriteGames') as FormArray;
  }

  onDeleteFavourite(index: number): void {
    this.favouriteGames.removeAt(index);
  }

  onAddToFavourites(): void {
    if (this.newFavourite.invalid) return;
    const newGame = this.newFavourite.value;
    this.favouriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavourite.reset();
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldErrors(field: string): string | null {
    // Si el campo no existe o no tiene errores, retornar nulo
    if (!this.myForm.controls[field]) return null;

    // Obtener los errores del campo
    const errors = this.myForm.controls[field].errors || {};

    //Buscar los errores y retornar el mensaje
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors[key].min}`;
        default:
          break;
      }
    }

    return null;
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favouriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
