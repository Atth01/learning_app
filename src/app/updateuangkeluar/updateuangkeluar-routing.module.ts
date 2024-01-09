import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateuangkeluarPage } from './updateuangkeluar.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateuangkeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateuangkeluarPageRoutingModule {}
