import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateuangkeluarPageRoutingModule } from './updateuangkeluar-routing.module';

import { UpdateuangkeluarPage } from './updateuangkeluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateuangkeluarPageRoutingModule
  ],
  declarations: [UpdateuangkeluarPage]
})
export class UpdateuangkeluarPageModule {}
