import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpendudukPage } from './addpenduduk.page';

const routes: Routes = [
  {
    path: '',
    component: AddpendudukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpendudukPageRoutingModule {}
