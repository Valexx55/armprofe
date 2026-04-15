import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

export const controlAltaFormGuardGuard: CanActivateFn = (route, state):GuardResult => {
  //route: parámetros, sufijos
  //state: la ruta actual completa
  //type MaybeAsync<T> = T | Observable<T> | Promise<T>
  //type GuardResult = boolean | UrlTree | RedirectCommand

  let resultadoGuardia: GuardResult = false;

  //voy a ver si está logueado
  //si está, digo deuvelvo true
  //si no, le mando al login

  console.log('State url = '+ state.url); 
  let authservice = inject(AuthenticationService);

  if (authservice.autenticado())
  {
    resultadoGuardia = true;
    console.log('Usuario autenticado');
  } else {
    let router = inject(Router);
    console.log('Usuario No autenticado a Login');
    resultadoGuardia = router.createUrlTree(['/login'] , {
      queryParams: { redirectTo: state.url }
    });
  }


  return resultadoGuardia;
};
