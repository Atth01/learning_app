import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateblokPage } from './updateblok.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateblokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateblokPageRoutingModule {}
