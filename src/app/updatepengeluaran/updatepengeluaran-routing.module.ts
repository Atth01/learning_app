import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatepengeluaranPage } from './updatepengeluaran.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatepengeluaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatepengeluaranPageRoutingModule {}
