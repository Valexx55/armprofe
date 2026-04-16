import { Routes } from '@angular/router';
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

export const routes: Routes = [
    {
        path: '',
        children: [
            {path: 'fortaleza', component: Fortaleza},
            {path: 'login', component: Login},
            {path: 'imc', component: ImcSignalComponent},
            
        ]
    } ,
    {
        path: 'alumno',
        canActivateChild: /*[()=>{
            window.alert('No te dejamos pasar');
            return false}]*/
            [controlSeccionAlumnoGuard],
        providers: [AlumnoService,
            {
                provide: ALUMNO_API_URL,
                useValue: environment.alumnoApiUrl
            }
        ],
        children: [
            {path: 'form', component: AlumnoForm, canActivate: [controlAltaFormGuardGuard]}, //alumno/form
            {path: 'listado', component: ListadoAlumnos},
            //{path: ':id', component: AlumnoDetalle} //eager loading - el componente se carga al inicio
            {
                path: ':id',
                ////se carga en diferido, menos JS inicial, mejora tiempo de arranque. Angular divide el bundle
                loadComponent: () => import('./components/alumno-detalle/alumno-detalle').then (m => m.AlumnoDetalle) 
                
            } //lazy loading sobre componentes stand-alone, carga bajo demanda
        ]
    }
];
