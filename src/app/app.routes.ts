import { Routes, CanMatchFn } from '@angular/router';
import { Fortaleza } from './components/fortaleza/fortaleza';
import { AlumnoForm } from './components/alumno-form/alumno-form';
import { ListadoAlumnos } from './components/listado-alumnos/listado-alumnos';
import { AlumnoService } from './services/alumno-service';
import { ALUMNO_API_URL } from './config/api.token';
import { environment } from '../environments/environment';
import { AlumnoDetalle } from './components/alumno-detalle/alumno-detalle';
import { controlAltaFormGuardGuard } from './guards/control-alta-form-guard-guard';
import { Login } from './components/login/login';
import { controlSeccionAlumnoGuard } from './guards/control-seccion-alumno-guard';
import { ImcSignalComponent } from './components/imc-signal-component/imc-signal-component';
import { controlSalidaFormAlumnoGuard } from './guards/control-salida-form-alumno-guard';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authentication-service';
import { controlDetalleAlumnoGuard } from './guards/control-detalle-alumno-guard';
import { alumnoDetalleResolverResolver } from './resolvers/alumno-detalle-resolver-resolver';
import { CsvWorkerimplements } from './components/csv-worker/csv-worker';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fortaleza', component: Fortaleza },
      { path: 'login', component: Login },
      { path: 'imc', component: ImcSignalComponent },
      { path: 'csv', component:  CsvWorkerimplements },
    ],
  },
  {
    path: 'alumno',
    /*[()=>{
            window.alert('No te dejamos pasar');
            return false}]*/
    canActivateChild: [controlSeccionAlumnoGuard],
    providers: [
      AlumnoService,
      {
        provide: ALUMNO_API_URL,
        useValue: environment.alumnoApiUrl,
      },
    ],
    children: [
      {
        path: 'form',
        component: AlumnoForm,
        canActivate: [controlAltaFormGuardGuard],
        canDeactivate: [controlSalidaFormAlumnoGuard],
      }, //alumno/form
      { path: 'listado', component: ListadoAlumnos },
      //{path: ':id', component: AlumnoDetalle} //eager loading - el componente se carga al inicio
      {
         /*canMatch: [()=>{
            let serivicioAuth = inject(AuthenticationService);
            let autenticado = serivicioAuth.autenticado();
            return autenticado;
        }
        ],*/
        path: ':id',
        //precargamos el alumno
        //1 se carga el código lazy de la ruta
        //2 se ejecuta el resolver (ya tengo la info del alumno)
        //3 se activa el componente y se muestra
        resolve: {
          alumnoPre: alumnoDetalleResolverResolver
        },
        canMatch: [controlDetalleAlumnoGuard],
        ////se carga en diferido, menos JS inicial, mejora tiempo de arranque. Angular divide el bundle
        loadComponent: () =>
          import('./components/alumno-detalle/alumno-detalle').then((m) => m.AlumnoDetalle),
      }, //lazy loading sobre componentes stand-alone, carga bajo demanda
      {
        path: ':id',
        ////se carga en diferido, menos JS inicial, mejora tiempo de arranque. Angular divide el bundle
        loadComponent: () =>
          import('./components/alumno-menos-detalle/alumno-menos-detalle').then((m) => m.AlumnoMenosDetalle),
      }
    ],
  },
];
