export interface AlumnoCsv {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  fechaAlta: string; // ej: 2024-11-01
}

export interface CsvAnalysisResult {
  total: number;
  duplicadosPorEmail: {
    email: string;
    repeticiones: number;
  }[];
  mediaEdad: number;
  porDominio: {
    dominio: string;
    total: number;
  }[];
  porAnioAlta: {
    anio: string;
    total: number;
  }[];
}