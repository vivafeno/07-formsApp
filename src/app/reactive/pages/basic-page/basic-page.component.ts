import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  standalone: false,

  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],	
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Inicializar el formulario al cargar la página
      this.myForm.reset({});
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
}

  getFieldErrors(field: string): string | null {    
    // Si el campo no existe o no tiene errores, retornar nulo
    if ( !this.myForm.controls[field] ) return null;

    // Obtener los errores del campo    
    const errors = this.myForm.controls[field].errors || {};    

    //Buscar los errores y retornar el mensaje
    for ( const key of Object.keys(errors)) 
      {
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
    };


  onSave():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();      
      return;
    } ;
    console.log(this.myForm.value);

    // Limpiar el formulario después de guardar
    this.myForm.reset({});
  }





}
