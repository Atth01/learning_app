import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatepengeluaranPageRoutingModule } from './updatepengeluaran-routing.module';

import { UpdatepengeluaranPage } from './updatepengeluaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatepengeluaranPageRoutingModule
  ],
  declarations: [UpdatepengeluaranPage]
})
export class UpdatepengeluaranPageModule {}
