import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatependudukPage } from './updatependuduk.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatependudukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatependudukPageRoutingModule {}
