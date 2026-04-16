import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { AlumnoForm } from '../components/alumno-form/alumno-form';

export const controlSalidaFormAlumnoGuard: CanDeactivateFn<AlumnoForm> = (
  component: AlumnoForm,
  currentRoute: ActivatedRouteSnapshot, //ruta, parámetros, componente: contexto actual
  currentState: RouterStateSnapshot,//ruta actual
  nextState: RouterStateSnapshot,//ruta destino
) => {
  let puedeSalir = component.cambiosConfirmados();
  console.log(` Estoy en ${currentState.url} y quiero ir a ${nextState}`);
  //console.log(` Current route root ${currentRoute.c} titulo ${currentRoute.title}`);

  if (!puedeSalir) {
    alert('Completa el formulario y pulsa enviar para poder salir');
  }

  return puedeSalir;
};
