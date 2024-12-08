import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { insumoResolver } from './insumo.resolver';

describe('insumoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => insumoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
