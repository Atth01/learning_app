import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddiuranPage } from './addiuran.page';

const routes: Routes = [
  {
    path: '',
    component: AddiuranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddiuranPageRoutingModule {}
