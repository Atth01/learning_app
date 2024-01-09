import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateiuranPageRoutingModule } from './updateiuran-routing.module';

import { UpdateiuranPage } from './updateiuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateiuranPageRoutingModule
  ],
  declarations: [UpdateiuranPage]
})
export class UpdateiuranPageModule {}
