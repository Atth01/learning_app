import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdduangkeluarPageRoutingModule } from './adduangkeluar-routing.module';

import { AdduangkeluarPage } from './adduangkeluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdduangkeluarPageRoutingModule
  ],
  declarations: [AdduangkeluarPage]
})
export class AdduangkeluarPageModule {}
