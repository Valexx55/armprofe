import { CanActivateChildFn } from '@angular/router';

export const controlSeccionAlumnoGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
