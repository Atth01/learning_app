import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendudukPageRoutingModule } from './penduduk-routing.module';

import { PendudukPage } from './penduduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendudukPageRoutingModule
  ],
  declarations: [PendudukPage]
})
export class PendudukPageModule {}
