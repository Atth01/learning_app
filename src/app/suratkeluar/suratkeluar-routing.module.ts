import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuratkeluarPage } from './suratkeluar.page';

const routes: Routes = [
  {
    path: '',
    component: SuratkeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuratkeluarPageRoutingModule {}
