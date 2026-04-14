import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable, of, timer } from 'rxjs';


//esto es "molde" del formulario
type AlumnoFormControls = {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  email: FormControl<string>;
  edad: FormControl<number>;
  creadoEn: FormControl<string>;
}


@Component({
  selector: 'app-alumno-form',
  imports: [],
  templateUrl: './alumno-form.html',
  styleUrl: './alumno-form.css',
})


export class AlumnoForm {

  //esto es un servicio que me permite crear
  //formularios infiriendo el tipo del campo (string, number)
  //y me da un valor por defecto, evitando valores nulos
  formBuilder = inject(NonNullableFormBuilder)

  //definimos el formulario: FormGroup

  alumnoForm: FormGroup<AlumnoFormControls> =
  this.formBuilder.group(
    {
      nombre : this.formBuilder.control('', {
        validators: [
          Validators.required, 
          Validators.minLength(4),
          Validators.maxLength(15)
        ]
      }),
      apellido: this.formBuilder.control('',
        {
          validators: [
            Validators.required
          ]
        }
      ),
      email: this.formBuilder.control('',{
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      edad: this.formBuilder.control(18, {
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(120)
        ],
        asyncValidators: [this.emailOcupadoValidator()]
      }),
      creadoEn:this.formBuilder.control(this.fechaActual(), 
    {
      validators: [Validators.required]
    })
    },
    //añado validadores de grupo a la definición del formulario
    {
      validators: [this.nombreApellidoDistintosValidator()]
    }
  )

  fechaActual ():string 
  {
    return new Date().toISOString().split('T')[0];
  }


    /*
    =====================================================
    VALIDADORES PERSONALIZADOS
    =====================================================
  */

  /*
    Validador de grupo:
    nombre y apellido no deben ser iguales.
    Ojo con esta cabecera, que si devuelvo null, estoy diciendo
    que la validación correcta, mientras que si encuentro un fallo,
    tengo que devolver el Validation Error campo + valor
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


}
