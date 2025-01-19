import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        // Simular un llamado http
        if (email === 'vivafeno@gmail.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete(); // Finaliza el observable
          //return;
        }

        // Si no existe el mail, retornar null
        subscriber.next(null);
        subscriber.complete();
      }
    );

    return httpCallObservable;
  }
}
