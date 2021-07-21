import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalonAddPageRoutingModule } from './calon-add-routing.module';

import { CalonAddPage } from './calon-add.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalonAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CalonAddPage]
})
export class CalonAddPageModule {}
