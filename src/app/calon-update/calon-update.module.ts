import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalonUpdatePageRoutingModule } from './calon-update-routing.module';

import { CalonUpdatePage } from './calon-update.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalonUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CalonUpdatePage]
})
export class CalonUpdatePageModule {}
