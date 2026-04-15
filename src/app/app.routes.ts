import { Routes } from '@angular/router';
import { Fortaleza } from './components/fortaleza/fortaleza';
import { AlumnoForm } from './components/alumno-form/alumno-form';
import { ListadoAlumnos } from './components/listado-alumnos/listado-alumnos';
import { AlumnoService } from './services/alumno-service';
import { ALUMNO_API_URL } from './config/api.token';
import { environment } from '../environments/environment';
import { AlumnoDetalle } from './components/alumno-detalle/alumno-detalle';

export const routes: Routes = [
    {
        path: '',
        children: [
            {path: 'fortaleza', component: Fortaleza},
        ]
    } ,
    {
        path: 'alumno',
        providers: [AlumnoService,
            {
                provide: ALUMNO_API_URL,
                useValue: environment.alumnoApiUrl
            }
        ],
        children: [
            {path: 'form', component: AlumnoForm}, //alumno/form
            {path: 'listado', component: ListadoAlumnos},
            {path: ':id', component: AlumnoDetalle}
        ]
    }
];
