import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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

  chdr = inject(ChangeDetectorRef); //este realmente, es el objeto que lanza los ciclos de revisión de estado de componente

  /**
   * 1 CONVERTIMOS NUESTRO PROYECTO EN UN APP ZONLESS
   * 
   * 1) MODIFICAMOS EL APP CONFIG
   * 2) ELIMINAMOS REFERENCIAS A ZONE EN ANGULAR.JSON
   * 3) ELIMINAMOS ZONE JS DEL PACKAGE JSON
   * 
   * CONSECUENCIA:
   * 
   * RECIBIMOS LOS DATOS DEL SERVIDOR, 
   * PERO NO SE MUESTRAN AUTOMÁTICAMENTE EN
   * EL HTML
   * 
   * "PERDEMOS LA MAGIA DE ANGULAR"
   */

  ngOnInit(): void {
    
    
    //this.varianteZoneLessFallida();
    this.varianteZoneLessFuncional();
   
  }

  /**
   * Esta función, se trae los alumnos del servicio, 
   * y como invoca al change detector reference, 
   * revisa el estado del componente y refresca
   * los cambios en la plantilla. Esto mismo, lo haría
   * por su cuenta Zone js
   */
  varianteZoneLessFuncional ()
  {
     this.alumnoService.leerTodosLosAlumnos().subscribe({
      next: (datos) => {
        console.log('Datos recibidos');
        console.table(datos);
        this.alumnos = datos;
        this.chdr.markForCheck();// FUERZO EL REFRESCO! --> EL estado del componente se revisa y la sincronía con los datos del HTML también.
      },
      error: (err) => {
        console.error('Error al leer alumnos', err);
      },
      complete: () => console.log('Com completada')

    })
  }

/**
   * Esta función, se trae los alumnos del servicio, 
   * y pero no son visibles, puesto que no llamamos
   * al Change Detector y no estamos usando Zone.js
   * (no se revisa el estado automáticamente)
   */
  varianteZoneLessFallida ()
  {
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
