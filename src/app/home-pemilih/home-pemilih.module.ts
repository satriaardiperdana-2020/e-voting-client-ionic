import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePemilihPageRoutingModule } from './home-pemilih-routing.module';

import { HomePemilihPage } from './home-pemilih.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePemilihPageRoutingModule
  ],
  declarations: [HomePemilihPage]
})
export class HomePemilihPageModule {}
