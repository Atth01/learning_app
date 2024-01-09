import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatependudukPageRoutingModule } from './updatependuduk-routing.module';

import { UpdatependudukPage } from './updatependuduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatependudukPageRoutingModule
  ],
  declarations: [UpdatependudukPage]
})
export class UpdatependudukPageModule {}
