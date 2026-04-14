import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno-service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-listado-alumnos',
  imports: [],
  templateUrl: './listado-alumnos.html',
  styleUrl: './listado-alumnos.css',
})
export class ListadoAlumnos implements OnInit {
  

  alumnoService = inject(AlumnoService);
  alumnos: Alumno[] = [];


  ngOnInit(): void {
   
    this.alumnoService.leerTodosLosAlumnos().subscribe({
      next: (datos) => {
        console.log('Datos recibidos');
        console.table(datos);
        this.alumnos = datos;
      },
      error: (err) => {
        console.error('Error al leer alumnos', err);
      },
      complete: () => console.log('Com completada')

    })
  }



}
