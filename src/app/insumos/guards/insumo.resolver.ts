



import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';


import { InsumosService } from '../services/insumos.service';
import { Insumo } from '../model/insumo';






export const insumoResolver: ResolveFn<Observable<Insumo>> = (route, state,  service: InsumosService = inject(InsumosService)) => {

  if (route.params?.['id']){
    return service.loadById(route.params['id']);
  }
  return of({id: '', nome_insumo: '', marca_insumo: ''});

};
