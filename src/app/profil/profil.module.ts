import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
