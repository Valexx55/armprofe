import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';


/**
 * En esta clase, nos comunicamos por HTTP
 */
@Injectable({
  providedIn: 'root',
})
export class AlumnoService {

  
   private httpClient = inject(HttpClient)

  leerTodosLosAlumnos () : Observable<Array<Alumno>>
   {
     return this.httpClient.get<Array<Alumno>>("https://my-json-server.typicode.com/valexx55/angularesjson/alumno")
   }

   getAlumnoById(id: number): Observable<Alumno> {
    return this.httpClient.get<Alumno>(`https://my-json-server.typicode.com/valexx55/angularesjson/alumno/${id}`);
  }
  
}
