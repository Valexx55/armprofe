import { Component, OnDestroy, signal } from '@angular/core';
import { AlumnoCsv, CsvAnalysisResult } from '../../models/modelcsv';

@Component({
  selector: 'app-csv-worker',
  imports: [],
  templateUrl: './csv-worker.html',
  styleUrl: './csv-worker.css',
})
export class CsvWorkerimplements implements OnDestroy {
  /**
   * Datos cargados desde el CSV.
   */
  alumnos = signal<AlumnoCsv[]>([]);

  /**
   * Resultado del análisis calculado por el worker.
   * Empieza a null hasta que se analiza algo.
   */
  resultado = signal<CsvAnalysisResult | null>(null);

  /**
   * Estado visual para mostrar que el worker está trabajando.
   */
  cargando = signal(false);

  /**
   * Mensaje informativo para la interfaz.
   */
  mensaje = signal('Selecciona un fichero CSV de alumnos.');

  /**
   * Referencia al web worker.
   * Se crea en el constructor si el navegador lo soporta.
   */
  private worker?: Worker;

  constructor() {
    /**
     * Comprobamos si el navegador soporta Web Workers.
     * En Angular SSR o entornos sin soporte, esto podría no existir.
     */
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('./csv-analisis.worker', import.meta.url)
      );

      /**
       * Cuando el worker termina, recibimos el resultado del análisis.
       */
      this.worker.onmessage = ({ data }: MessageEvent<CsvAnalysisResult>) => {
        this.resultado.set(data);
        this.cargando.set(false);
        this.mensaje.set('Análisis completado correctamente.');
      };

      /**
       * Si algo falla dentro del worker, lo reflejamos en consola y en UI.
       */
      this.worker.onerror = (error) => {
        console.error('Error en el web worker:', error);
        this.cargando.set(false);
        this.mensaje.set('Se produjo un error al analizar el CSV.');
      };
    } else {
      this.mensaje.set('El navegador no soporta Web Workers.');
    }
  }

  ngOnDestroy(): void {
    /**
     * Cerramos el worker al destruir el componente
     * para liberar recursos.
     */
    this.worker?.terminate();
  }

  /**
   * Se ejecuta cuando el usuario selecciona un fichero.
   * Lee el CSV, lo parsea y lanza el análisis.
   */
  async onFileSelected(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    this.mensaje.set('No se ha seleccionado ningún fichero.');
  } else if (!file.name.toLowerCase().endsWith('.csv')) {
    /**
     * Validación simple por nombre/extensión.
     * Para demo es suficiente.
     */
    this.mensaje.set('El fichero seleccionado no parece un CSV.');
  } else {
    try {
      this.mensaje.set(`Leyendo fichero: ${file.name}`);

      /**
       * Leemos el contenido completo del archivo como texto.
       */
      const text = await file.text();

      /**
       * Convertimos el texto CSV en un array de alumnos.
       */
      const alumnosParseados = this.parseCsv(text);

      this.alumnos.set(alumnosParseados);
      this.resultado.set(null);
      this.cargando.set(false);

      if (!alumnosParseados.length) {
        this.mensaje.set('El fichero no contiene filas válidas.');
      } else {
        this.mensaje.set(
          `Fichero cargado correctamente. Filas detectadas: ${alumnosParseados.length}. Pulsa "Analizar".`
        );
      }
    } catch (error) {
      console.error('Error leyendo el fichero:', error);
      this.mensaje.set('No se pudo leer el fichero seleccionado.');
    }
  }
}

  /**
   * Lanza el análisis de los datos.
   * Si hay worker, usa worker.
   * Si no, usa fallback en hilo principal.
   */
 analizar(): void {
  const data = this.alumnos();

  if (!data.length) {
    this.mensaje.set('No hay datos cargados para analizar.');
  } else {
    this.cargando.set(true);
    this.mensaje.set('Analizando CSV en segundo plano...');

    if (this.worker) {
      this.worker.postMessage(data);
    } else {
      this.mensaje.set('Sin soporte de worker.');
      
    }
  }
}

  /**
   * Limpia el estado del componente.
   */
  limpiar(): void {
    this.alumnos.set([]);
    this.resultado.set(null);
    this.cargando.set(false);
    this.mensaje.set('Selecciona un fichero CSV de alumnos.');
  }

  /**
   * Parser CSV muy simple.
   *
   * Formato esperado:
   * id,nombre,apellido,email,edad,fechaAlta
   * 1,Ana,García,ana@gmail.com,22,2023-01-15
   */
  private parseCsv(text: string): AlumnoCsv[] {
    const lineas = text
      .split(/\r?\n/)
      .map(linea => linea.trim())
      .filter(Boolean);

    /**
     * Si no hay cabecera + al menos una fila, no hay datos útiles.
     */
    if (lineas.length < 2) {
      return [];
    }

    /**
     * Ignoramos la primera línea porque es la cabecera.
     */
    const [, ...filas] = lineas;

    return filas.map((linea, index) => {
      /**
       * Desestructuración de arrays:
       * cada posición del split se asigna a una variable.
       */
      const [id, nombre, apellido, email, edad, fechaAlta] = linea.split(',');

      return {
        id: Number(id ?? index + 1),
        nombre: (nombre ?? '').trim(),
        apellido: (apellido ?? '').trim(),
        email: (email ?? '').trim(),
        edad: Number(edad ?? 0),
        fechaAlta: (fechaAlta ?? '').trim(),
      };
    });
  }



}
