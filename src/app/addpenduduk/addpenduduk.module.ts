import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpendudukPageRoutingModule } from './addpenduduk-routing.module';

import { AddpendudukPage } from './addpenduduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpendudukPageRoutingModule
  ],
  declarations: [AddpendudukPage]
})
export class AddpendudukPageModule {}
