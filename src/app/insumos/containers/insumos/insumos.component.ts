import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Insumo } from '../../model/insumo';
import { InsumosService } from '../../services/insumos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent  {

  insumo$: Observable <Insumo[]> | null= null;
  //insumo: Insumo[] = [];
  //InsumosService: InsumosService;

  //displayedColumns = ['id', 'nome_insumo','marca_insumo', 'actions'];
    //  'preco_insumo',
    //'quantidade_insumo'

constructor(
  public dialog: MatDialog,
  private insumosService: InsumosService,
  private router: Router,
  private route: ActivatedRoute,
  private snackBar: MatSnackBar)
  {
            //this.insumos = [];
            //  this.InsumosService = new InsumosService();
  this.refresh();
            //this.insumosService.list().subscribe(insumos => this.insumo = insumos)
  }

refresh() {
  this.insumo$ = this.insumosService.list()
  .pipe(
    catchError(error => {
      this.onError('Erro ao carregar os produtos');
      //  console.log()
      return of ([])

    })
  );
}


onError(errosMsg: string) {
  this.dialog.open(ErrorDialogComponent, {
    data: errosMsg

  });
}

  onAdd(){

    this.router.navigate(['novo'], {relativeTo: this.route});

    //alert('onAdd');
    //console.log('onAdd');

  }

  onEdit(insumo: Insumo){
    this.router.navigate(['editar', insumo.id], {relativeTo: this.route});
  }

  onRemove(insumo: Insumo){


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      //width: '250px',
      data: 'Tem certeza que deseja remover o produto?'
    });

    dialogRef.afterClosed().subscribe( (result: boolean)=> {
      //console.log('The dialog was closed');
      //this.animal = result;
      if(result){
        this.insumosService.remove(insumo.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Produto Removido com sucesso', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Erro ao tentar removar o produto')
        );
      }
    });

  }

}
