import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateiuranPage } from './updateiuran.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateiuranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateiuranPageRoutingModule {}
