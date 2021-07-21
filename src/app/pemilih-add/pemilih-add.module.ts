import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PemilihAddPageRoutingModule } from './pemilih-add-routing.module';

import { PemilihAddPage } from './pemilih-add.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PemilihAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PemilihAddPage]
})
export class PemilihAddPageModule {}
