import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpengeluaranPageRoutingModule } from './addpengeluaran-routing.module';

import { AddpengeluaranPage } from './addpengeluaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpengeluaranPageRoutingModule
  ],
  declarations: [AddpengeluaranPage]
})
export class AddpengeluaranPageModule {}
