import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UangkeluarPageRoutingModule } from './uangkeluar-routing.module';

import { UangkeluarPage } from './uangkeluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UangkeluarPageRoutingModule
  ],
  declarations: [UangkeluarPage]
})
export class UangkeluarPageModule {}
