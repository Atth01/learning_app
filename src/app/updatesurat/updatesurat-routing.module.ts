import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesuratPage } from './updatesurat.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesuratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesuratPageRoutingModule {}
