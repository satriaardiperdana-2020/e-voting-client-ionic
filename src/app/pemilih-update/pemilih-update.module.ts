import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PemilihUpdatePageRoutingModule } from './pemilih-update-routing.module';

import { PemilihUpdatePage } from './pemilih-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PemilihUpdatePageRoutingModule
  ],
  declarations: [PemilihUpdatePage]
})
export class PemilihUpdatePageModule {}
