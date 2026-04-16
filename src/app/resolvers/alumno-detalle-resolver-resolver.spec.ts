import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { alumnoDetalleResolverResolver } from './alumno-detalle-resolver-resolver';

describe('alumnoDetalleResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => alumnoDetalleResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
