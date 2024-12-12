import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, take } from 'rxjs/operators';

import { Insumo } from '../model/Insumo';
import { InsumoPage } from '../model/insumo-page';


@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private readonly API = 'api/insumos';

  constructor(private readonly httpClient: HttpClient) { }

  list(page = 0, size = 5){
    return this.httpClient.get<InsumoPage>(this.API, {params:{ page, size }})
    .pipe(
      take(1),
      first(),
      //delay(3000),
      //tap(insumos => console.log(insumos))
    );
  }

  save(record: Partial<Insumo>){

      //console.log(record);
    if(record.id){
      //console.log('update');
      return this.update(record);
   }
     //console.log('create');
     return this.create(record);
  }

  loadById(id: string){
    return this.httpClient.get<Insumo>(`${this.API}/${id}`);
   }

   private create(record: Partial<Insumo>){
      return this.httpClient.post<Insumo>(this.API, record)
      .pipe(first());
   }

   private update(record: Partial<Insumo>){
      return this.httpClient.put<Insumo>(`${this.API}/${record.id}`, record)
      .pipe(first());

   }

   remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`)
    .pipe(first());

 }




}
