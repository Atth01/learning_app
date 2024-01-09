import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddiuranPageRoutingModule } from './addiuran-routing.module';

import { AddiuranPage } from './addiuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddiuranPageRoutingModule
  ],
  declarations: [AddiuranPage]
})
export class AddiuranPageModule {}
