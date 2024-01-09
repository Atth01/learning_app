import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsuratPage } from './addsurat.page';

const routes: Routes = [
  {
    path: '',
    component: AddsuratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsuratPageRoutingModule {}
