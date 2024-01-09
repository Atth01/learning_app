import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatepesanPage } from './updatepesan.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatepesanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatepesanPageRoutingModule {}
