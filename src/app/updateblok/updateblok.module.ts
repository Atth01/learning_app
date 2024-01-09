import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateblokPageRoutingModule } from './updateblok-routing.module';

import { UpdateblokPage } from './updateblok.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateblokPageRoutingModule
  ],
  declarations: [UpdateblokPage]
})
export class UpdateblokPageModule {}
