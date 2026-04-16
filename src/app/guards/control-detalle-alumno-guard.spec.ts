import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { controlDetalleAlumnoGuard } from './control-detalle-alumno-guard';

describe('controlDetalleAlumnoGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlDetalleAlumnoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
