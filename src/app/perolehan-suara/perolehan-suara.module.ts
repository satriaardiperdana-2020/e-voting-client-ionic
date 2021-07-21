import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerolehanSuaraPageRoutingModule } from './perolehan-suara-routing.module';

import { PerolehanSuaraPage } from './perolehan-suara.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerolehanSuaraPageRoutingModule
  ],
  declarations: [PerolehanSuaraPage]
})
export class PerolehanSuaraPageModule {}
