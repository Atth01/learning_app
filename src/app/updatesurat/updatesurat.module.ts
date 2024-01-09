import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatesuratPageRoutingModule } from './updatesurat-routing.module';

import { UpdatesuratPage } from './updatesurat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatesuratPageRoutingModule
  ],
  declarations: [UpdatesuratPage]
})
export class UpdatesuratPageModule {}
