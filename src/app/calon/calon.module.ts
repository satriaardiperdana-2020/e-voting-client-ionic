import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalonPageRoutingModule } from './calon-routing.module';

import { CalonPage } from './calon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalonPageRoutingModule
  ],
  declarations: [CalonPage]
})
export class CalonPageModule {}
