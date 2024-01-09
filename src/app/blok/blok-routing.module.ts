import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlokPage } from './blok.page';

const routes: Routes = [
  {
    path: '',
    component: BlokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlokPageRoutingModule {}
