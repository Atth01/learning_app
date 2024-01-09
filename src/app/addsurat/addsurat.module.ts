import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsuratPageRoutingModule } from './addsurat-routing.module';

import { AddsuratPage } from './addsurat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsuratPageRoutingModule
  ],
  declarations: [AddsuratPage]
})
export class AddsuratPageModule {}
