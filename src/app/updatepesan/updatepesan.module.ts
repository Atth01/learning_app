import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatepesanPageRoutingModule } from './updatepesan-routing.module';

import { UpdatepesanPage } from './updatepesan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatepesanPageRoutingModule
  ],
  declarations: [UpdatepesanPage]
})
export class UpdatepesanPageModule {}
