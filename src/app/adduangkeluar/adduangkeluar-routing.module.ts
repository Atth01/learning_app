import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdduangkeluarPage } from './adduangkeluar.page';

const routes: Routes = [
  {
    path: '',
    component: AdduangkeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdduangkeluarPageRoutingModule {}
