import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marca'
})
export class MarcaPipe implements PipeTransform {


  // CONSERTAR PARA UNIDADE
  transform(value: string, ...args: unknown[]): string {
    switch(value){
      case 'fe': return 'code';
      case 'be': return 'bolt'
    }
    return 'bolt';
  }

}
