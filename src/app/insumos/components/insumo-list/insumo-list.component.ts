import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Insumo } from '../../model/insumo';

@Component({
  selector: 'app-insumo-list',
  templateUrl: './insumo-list.component.html',
  styleUrl: './insumo-list.component.scss'
})
export class InsumoListComponent {


  @Input() insumo: Insumo[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  readonly displayedColumns = ['id', 'nome_insumo','marca_insumo', 'actions'];


  constructor(
    //private router: Router,
    //private route: ActivatedRoute
    ){}


  onAdd(){
    this.add.emit(true);
    //this.router.navigate(['novo'], {relativeTo: this.route});
    //alert('onAdd');
    //console.log('onAdd');

  }

  onEdit(insumo: Insumo){

      this.edit.emit(insumo);
  }

  onDelete(insumo: Insumo){
    this.remove.emit(insumo);
  }
}
