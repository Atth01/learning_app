import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateinfoPage } from './updateinfo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateinfoPageRoutingModule {}
