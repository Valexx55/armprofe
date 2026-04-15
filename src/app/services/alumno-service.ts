import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { ALUMNO_API_URL } from '../config/api.token';


/**
 * En esta clase, nos comunicamos por HTTP
 * por norma los servicios cuando se declaran quedan vivos para un 
 * ámbito global de esta manera estamos haciendo que solo exista 
 * alumnos service cuando estoy en la ruta barra alumnos optimizando el tamaño del entorno de ejecución 
 */
@Injectable(/*{
  //providedIn: 'root', //hacemos que el servicio tenga un ámbito local para sólo las rutas /alumno
}*/)
export class AlumnoService {

  
   private httpClient = inject(HttpClient)
   private apiUrl = inject(ALUMNO_API_URL);

  leerTodosLosAlumnos () : Observable<Array<Alumno>>
   {
     //return this.httpClient.get<Array<Alumno>>("https://my-json-server.typicode.com/valexx55/angularesjson/alumno")
     return this.httpClient.get<Array<Alumno>>(this.apiUrl);
   }

   getAlumnoById(id: number): Observable<Alumno> {
    //return this.httpClient.get<Alumno>(`https://my-json-server.typicode.com/valexx55/angularesjson/alumno/${id}`);
    return this.httpClient.get<Alumno>(`${this.apiUrl}/${id}`);
  }
  
}
