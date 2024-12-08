import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { InsumosRoutingModule } from './insumos-routing.module';
import { InsumosComponent } from './containers/insumos/insumos.component';
import { InsumoFormComponent } from './containers/insumo-form/insumo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InsumoListComponent } from './components/insumo-list/insumo-list.component';




@NgModule({
  declarations: [
    InsumosComponent,
    InsumoFormComponent,
    InsumoListComponent
  ],
  imports: [
    CommonModule,
    InsumosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class InsumosModule { }
