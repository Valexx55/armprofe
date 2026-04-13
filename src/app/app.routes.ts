import { Routes } from '@angular/router';
import path from 'path';
import { Fortaleza } from './components/fortaleza/fortaleza';

export const routes: Routes = [
    {
        path: '',
        children: [
            {path: 'fortaleza', component: Fortaleza}
        ]
    }
];
