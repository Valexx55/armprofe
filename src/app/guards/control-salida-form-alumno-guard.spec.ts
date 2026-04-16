import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { controlSalidaFormAlumnoGuard } from './control-salida-form-alumno-guard';

describe('controlSalidaFormAlumnoGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlSalidaFormAlumnoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
