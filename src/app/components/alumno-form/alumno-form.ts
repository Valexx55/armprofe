import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

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

}
