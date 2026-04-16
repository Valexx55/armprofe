import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { controlSeccionAlumnoGuard } from './control-seccion-alumno-guard';

describe('controlSeccionAlumnoGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlSeccionAlumnoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
