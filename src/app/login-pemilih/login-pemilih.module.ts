import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPemilihPageRoutingModule } from './login-pemilih-routing.module';

import { LoginPemilihPage } from './login-pemilih.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPemilihPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPemilihPage]
})
export class LoginPemilihPageModule {}
