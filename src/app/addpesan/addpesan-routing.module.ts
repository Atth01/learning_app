import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpesanPage } from './addpesan.page';

const routes: Routes = [
  {
    path: '',
    component: AddpesanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpesanPageRoutingModule {}
