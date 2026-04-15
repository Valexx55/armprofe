import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { controlAltaFormGuardGuard } from './control-alta-form-guard-guard';

describe('controlAltaFormGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlAltaFormGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
