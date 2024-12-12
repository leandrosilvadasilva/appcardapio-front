import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { InsumosService } from '../../services/insumos.service';
import { Insumo } from '../../model/Insumo';
import { InsumoPage } from '../../model/insumo-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent  {

  insumo$: Observable <InsumoPage> | null= null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

constructor(
  public dialog: MatDialog,
  private insumosService: InsumosService,
  private router: Router,
  private route: ActivatedRoute,
  private snackBar: MatSnackBar)
  {

  this.refresh();

  }

refresh(pageEvent = { length: 0, pageIndex: 0, pageSize: 10} ) {
  this.insumo$ = this.insumosService.list(pageEvent.pageIndex, pageEvent.pageSize)
  .pipe(
    tap(() => {
      this.pageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;
    }),
    catchError(error => {
      this.onError('Erro ao carregar os produtos');
      //  console.log()
      return of ({insumos: [], totalElements: 0, totalPages: 0 })

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
