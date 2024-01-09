import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuratkeluarPageRoutingModule } from './suratkeluar-routing.module';

import { SuratkeluarPage } from './suratkeluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuratkeluarPageRoutingModule
  ],
  declarations: [SuratkeluarPage]
})
export class SuratkeluarPageModule {}
