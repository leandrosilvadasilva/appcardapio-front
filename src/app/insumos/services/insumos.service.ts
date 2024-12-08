import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Insumo } from '../model/insumo';
import { delay, first, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private readonly API = 'api/insumos';
  //private readonly API = '/assets/insumos.json';


  constructor(private readonly httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Insumo[]>(this.API)
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
