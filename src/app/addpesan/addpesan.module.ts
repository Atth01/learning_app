import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpesanPageRoutingModule } from './addpesan-routing.module';

import { AddpesanPage } from './addpesan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpesanPageRoutingModule
  ],
  declarations: [AddpesanPage]
})
export class AddpesanPageModule {}
