import { ResolveFn } from '@angular/router';
import { Alumno } from '../models/alumno';
import { inject } from '@angular/core';
import { AlumnoService } from '../services/alumno-service';
import { Observable } from 'rxjs';

//cargo de manera anticipada el alumno que voy a mostrar en el detalle
export const alumnoDetalleResolverResolver: ResolveFn<Alumno> = (route, state) => {

  let alumnoDevuelto : Observable<Alumno>;
   
    //TODO: prueba de +! con paréntesis
    let paramIdString = route.paramMap.get('id');
    let parametroid = Number(paramIdString);
    let alumnoService = inject(AlumnoService);

     alumnoDevuelto = alumnoService.getAlumnoById(parametroid);


  return alumnoDevuelto;
};
