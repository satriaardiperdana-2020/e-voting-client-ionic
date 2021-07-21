import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarPemilihPageRoutingModule } from './daftar-pemilih-routing.module';

import { DaftarPemilihPage } from './daftar-pemilih.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarPemilihPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DaftarPemilihPage]
})
export class DaftarPemilihPageModule {}
