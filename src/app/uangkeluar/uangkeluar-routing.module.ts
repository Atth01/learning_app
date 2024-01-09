import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UangkeluarPage } from './uangkeluar.page';

const routes: Routes = [
  {
    path: '',
    component: UangkeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UangkeluarPageRoutingModule {}
