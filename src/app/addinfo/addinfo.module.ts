import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddinfoPageRoutingModule } from './addinfo-routing.module';

import { AddinfoPage } from './addinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddinfoPageRoutingModule
  ],
  declarations: [AddinfoPage]
})
export class AddinfoPageModule {}
