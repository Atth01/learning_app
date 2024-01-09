import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlokPageRoutingModule } from './blok-routing.module';

import { BlokPage } from './blok.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlokPageRoutingModule
  ],
  declarations: [BlokPage]
})
export class BlokPageModule {}
