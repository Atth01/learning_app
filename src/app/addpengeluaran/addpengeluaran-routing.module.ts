import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpengeluaranPage } from './addpengeluaran.page';

const routes: Routes = [
  {
    path: '',
    component: AddpengeluaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpengeluaranPageRoutingModule {}
