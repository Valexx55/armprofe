import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**', //por defecto, todos nuestros compoennte son CSR (se dibujan, se crean el cliente)
    renderMode: RenderMode.Client
  },
  {
    path: 'fortaleza',
    renderMode: RenderMode.Prerender //SSG Static Side Generation -- SEO (info estática) La página queda definida el servidor, para su consumo directo vía URL
  },
  {
    path: 'alumno/listado',
    renderMode: RenderMode.Server //SSR Server Side Rendering. Igual que el SSG, pero la página se recrea en cada petición (info dinámica)
  }
];
