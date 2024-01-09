import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddinfoPage } from './addinfo.page';

const routes: Routes = [
  {
    path: '',
    component: AddinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddinfoPageRoutingModule {}
