import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsumosComponent } from './containers/insumos/insumos.component';
import { InsumoFormComponent } from './containers/insumo-form/insumo-form.component';
import { insumoResolver } from './guards/insumo.resolver';

const routes: Routes = [
  { path: '', component: InsumosComponent },
  { path: 'novo', component: InsumoFormComponent, resolve: {
    insumo: insumoResolver }},
  { path: 'editar/:id', component: InsumoFormComponent, resolve: {
    insumo: insumoResolver
  } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumosRoutingModule { }
