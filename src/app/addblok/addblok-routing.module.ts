import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddblokPage } from './addblok.page';

const routes: Routes = [
  {
    path: '',
    component: AddblokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddblokPageRoutingModule {}
