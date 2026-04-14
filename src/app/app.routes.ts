import { Routes } from '@angular/router';
import { Fortaleza } from './components/fortaleza/fortaleza';
import { AlumnoForm } from './components/alumno-form/alumno-form';
import { ListadoAlumnos } from './components/listado-alumnos/listado-alumnos';

export const routes: Routes = [
    {
        path: '',
        children: [
            {path: 'fortaleza', component: Fortaleza},
        ]
    } ,
    {
        path: 'alumno',
        children: [
            {path: 'form', component: AlumnoForm}, //alumno/form
            {path: 'listado', component: ListadoAlumnos}
        ]
    }
];
