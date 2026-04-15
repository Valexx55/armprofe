/**
 * PASOS PARA CREAR CONFIGURACIONES POR ENTORNO
 * 
 * 1) ng g environments
 * 2) rellenamos con los valores deseados clave-valor en cada fichero enviroment
 * 3) Usamos InjectionToken para cargar dinámicamente un valor y referirlo por una costante (api.token.ts)
 * 4) inject ese valor Cte. exportado en punto anterior
 * 5) en el fichero de app routes, parametrizo la propiedad del entorno que deseo seleccionar
 * 6) al hacer ng serve (usa development por defecto)
 *    ng serve --configuration production - usamos la configuración de producción -
 *    ng build  (usa producción por defecto)
 *    ng build --configuration development - usamos la configuración de development -
 */

export const environment = {
    production: true,
    alumnoApiUrl: 'http://localhost:3000/alumno'
};
