/// <reference lib="webworker" />

import { AlumnoCsv, CsvAnalysisResult } from "../../models/modelcsv";


/*
ng generate web-worker location

//inicio desde el C
this.worker = new Worker(
  new URL('./csv-analisis.worker', import.meta.url)
);

//programo la escucha
addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

//llamo al acabar
this.worker.postMessage(data);

Importante, no tengo acceso al DOM

//desde el C, esicho la respuesta
this.worker.onmessage = ({ data }) => {
  console.log(data);
};
//lo acabo
this.worker.terminate();
*/
addEventListener('message', ({ data }: MessageEvent<AlumnoCsv[]>) => {
  const alumnos = data;

  const total = alumnos.length;

  const emailsMap = new Map<string, number>();
  const dominiosMap = new Map<string, number>();
  const aniosMap = new Map<string, number>();

  let sumaEdades = 0;

  for (const alumno of alumnos) {
    const email = alumno.email.trim().toLowerCase();
    emailsMap.set(email, (emailsMap.get(email) ?? 0) + 1);

    const dominio = email.includes('@') ? email.split('@')[1] : 'desconocido';
    dominiosMap.set(dominio, (dominiosMap.get(dominio) ?? 0) + 1);

    const anio = alumno.fechaAlta?.slice(0, 4) || 'sin-fecha';
    aniosMap.set(anio, (aniosMap.get(anio) ?? 0) + 1);

    sumaEdades += Number(alumno.edad) || 0;

    // pequeña carga artificial opcional para que se note algo más en la demo
    for (let i = 0; i < 1000; i++) {
      Math.sqrt(i * 13);
    }
  }

  const duplicadosPorEmail = Array.from(emailsMap.entries())
    .filter(([, repeticiones]) => repeticiones > 1)
    .map(([email, repeticiones]) => ({ email, repeticiones }))
    .sort((a, b) => b.repeticiones - a.repeticiones);

  const porDominio = Array.from(dominiosMap.entries())
    .map(([dominio, total]) => ({ dominio, total }))
    .sort((a, b) => b.total - a.total);

  const porAnioAlta = Array.from(aniosMap.entries())
    .map(([anio, total]) => ({ anio, total }))
    .sort((a, b) => a.anio.localeCompare(b.anio));

  const resultado: CsvAnalysisResult = {
    total,
    duplicadosPorEmail,
    mediaEdad: total ? Number((sumaEdades / total).toFixed(2)) : 0,
    porDominio,
    porAnioAlta,
  };

  postMessage(resultado);
});