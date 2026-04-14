import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';


type AlumnoFormControls = {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  email: FormControl<string>;
  edad: FormControl<number>;
  creadoEn: FormControl<string>;
};

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumno-form.html',
  styleUrl: './alumno-form.css',
})
export class AlumnoForm {
  /**
   *NonNullableFormBuilder para que los controles del formulario no queden tipados como T | null, sino como T directamente
   * ng infiere el tipo al crear el control
   *
   * 
   * sin él, el tipo inferido sería  
   * const fb = new FormBuilder();
   * 
   * const form = fb.group({
  nombre: '',
});
   * 
   * FormControl<string | null>
   * 
   * y con él 
   * 
   * private fb = inject(NonNullableFormBuilder);

form = this.fb.group({
  nombre: '',
  apellido: '',
});

FormControl<string>

 
   */
  private fb = inject(NonNullableFormBuilder);

  /*
    Formulario reactivo principal.

    Incluye:
    - validadores síncronos
    - validador asíncrono en email
    - validador de grupo
  */


   alumnoForm: FormGroup<AlumnoFormControls> = this.fb.group(
    {
      nombre: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      }),

      apellido: this.fb.control('', {
        validators: [Validators.required],
      }),

      email: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.email,
        ],
        asyncValidators: [this.emailOcupadoValidator()],
        updateOn: 'blur',
      }),

      edad: this.fb.control(18, {
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      }),

      creadoEn: this.fb.control(this.getTodayDate(), {
        validators: [Validators.required],
      }),


    },
    {
      validators: [this.nombreApellidoDistintosValidator()],
    }
  );

  alumnoEnviado: string | null = null;

  /*
    Carga un ejemplo de datos.
    Muy útil para mostrar patchValue y para probar el formulario rápido.
    Para programadores, que quierien inicializar con datos formualrio
    y no hacerlo manualmente (sin que salten las vali)
  */
  cargarEjemplo(): void {
    this.alumnoForm.patchValue({
      nombre: 'Carlos',
      apellido: 'Moreno',
      email: 'carlos@correo.com',
      edad: 25,
      creadoEn: this.getTodayDate(),
    });

    //esto lo pondríamos porque 
    //al rellenar con patchvalue, los controles
    //no aparece ni como dirty ni como touched
    //y no sale el fallo al cargar un correo incorrecto

    //si yo invoco esta línea, estoy haciendo que el 
    //fomrulario sea consciente del cambio de estado y valide
    //si no, con el patchValue, modificado el estado "silenciosamente"

    //this.alumnoForm.markAllAsTouched();
 

    this.alumnoEnviado = null;
  }



  /*
    Reinicia el formulario a su estado inicial.
  */
  resetForm(): void {
    this.alumnoForm.reset({
      nombre: '',
      apellido: '',
      email: '',
      edad: 18,
      creadoEn: this.getTodayDate(),
    });

    this.alumnoEnviado = null;
  }

  /*
    Envío del formulario.
    Si no es válido o está pendiente, marcamos todo como touched.
  */
  submit(): void {
    if (this.alumnoForm.valid && !this.alumnoForm.pending) {
    
      this.alumnoEnviado = JSON.stringify(this.alumnoForm.getRawValue(), null, 2);
      console.log('alumno enviado = ' + this.alumnoEnviado);
    }

    
  }

  /*
    =====================================================
    VALIDADORES PERSONALIZADOS
    =====================================================
  */

  /*
    Validador de grupo:
    nombre y apellido no deben ser iguales.
  */
  private nombreApellidoDistintosValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const nombre = String(group.get('nombre')?.value ?? '')
        .trim()
        .toLowerCase();
      const apellido = String(group.get('apellido')?.value ?? '')
        .trim()
        .toLowerCase();

      if (!nombre || !apellido) {
        return null;
      }

      return nombre === apellido ? { nombreApellidoIguales: true } : null;
    };
  }

  /*
    Validador asíncrono simulado.
    Simula consulta al servidor para detectar emails ya usados.
  */
  private emailOcupadoValidator(): AsyncValidatorFn {
    const emailsOcupados = ['admin@correo.com', 'test@correo.com', 'carlos@correo.com'];

    let fnValidator: AsyncValidatorFn = (control: AbstractControl) : Observable<null | ValidationErrors> => {
      let vdev: Observable<null | ValidationErrors>;

        //pasamos a minúsculas el valor en caso de exista y tenga algo
        let valorMail = String(control.value ?? '')
          .trim()
          .toLowerCase();

        if (!valorMail) {//si está vacío , no devolvemos errores
          vdev = of(null); //la validación de email no duplicado la "pasamos" por estar vacío. No implica que sea válido (supere las otras validaciones)
        } else {
          vdev = timer(700).pipe(
            map(() => (emailsOcupados.includes(valorMail) ? { emailOcupado: true } : null)),
          );
        }

      return vdev;
    };
    return fnValidator;
  }

  /*
    Devuelve la fecha de hoy en formato compatible con input type="date".
  */
  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

//lo usaré después para las guards
  cambiosConfirmados():boolean {
   return (this.alumnoEnviado!=null) //
      
  }
}
