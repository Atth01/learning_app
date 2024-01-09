import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateinfoPageRoutingModule } from './updateinfo-routing.module';

import { UpdateinfoPage } from './updateinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateinfoPageRoutingModule
  ],
  declarations: [UpdateinfoPage]
})
export class UpdateinfoPageModule {}
