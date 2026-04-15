import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

//por defecto es standAlone

/**
 * Imporntante: destacar el efecto del reuse
 * lo trae Angular de serie. Si cambio en un ruta
 * sólo sus parámetros, el componente no se destruye
 * y se vuelve a crear
 * 
 * 
 * reuse bsico https://angular.dev/api/router/BaseRouteReuseStrategy
 */
@Component({
  selector: 'app-alumno-detalle',
  imports: [AsyncPipe, RouterLink, NgOptimizedImage],
  templateUrl: './alumno-detalle.html',
  styleUrl: './alumno-detalle.css',
})
export class AlumnoDetalle implements OnInit, OnDestroy {

  private alumnoService = inject(AlumnoService);
  private router = inject (Router); //para enrutar progrmáticamente
  private activateRoute = inject(ActivatedRoute); //para controlar la ruta activa location

  alumno$ = this.activateRoute.paramMap.pipe //observamos la ruta
  (
    map(params => Number(params.get('id'))), //extraemos el id actual
    switchMap(id => this.alumnoService.getAlumnoById(id)) //obtenemos el alumno actual alumno$
  ) 
  
  getFotoUrl (id: number):string
  {
    let ruta_foto = '';
    
      let sexo = id % 2 == 0 ? 'women' : 'men';
      ruta_foto = `https://randomuser.me/api/portraits/${sexo}/${id}.jpg`;

    return ruta_foto
  }
  
  
  ngOnDestroy(): void {
    console.log('En On Destroy de AlumnoDetalle');
  }
  
  
  ngOnInit(): void {
   console.log('En On ngOnInit de AlumnoDetalle');
  }

  irAnterior (id: number):void
  {
      this.router.navigate(['/alumno', id-1]);
  }

  irSiguiente (id: number):void
  {
      this.router.navigate(['/alumno', id+1]);
  }

}
