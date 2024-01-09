import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendudukPage } from './penduduk.page';

const routes: Routes = [
  {
    path: '',
    component: PendudukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendudukPageRoutingModule {}
