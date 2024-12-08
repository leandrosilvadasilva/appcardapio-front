import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MarcaPipe } from './pipes/marca.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    MarcaPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[
    ErrorDialogComponent,
    MarcaPipe,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
