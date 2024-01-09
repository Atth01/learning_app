import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddblokPageRoutingModule } from './addblok-routing.module';

import { AddblokPage } from './addblok.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddblokPageRoutingModule
  ],
  declarations: [AddblokPage]
})
export class AddblokPageModule {}
