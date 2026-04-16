import { CanMatchFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';
import { inject } from '@angular/core';

export const controlDetalleAlumnoGuard: CanMatchFn = (route, segments) => {
  let serivicioAuth = inject(AuthenticationService);
  let autenticado = serivicioAuth.autenticado();
  return autenticado;
};
