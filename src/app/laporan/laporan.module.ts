import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaporanPageRoutingModule } from './laporan-routing.module';

import { LaporanPage } from './laporan.page';
import { ReactiveFormsModule } from '@angular/forms';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaporanPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    File,
    FileOpener
  ],
  declarations: [LaporanPage]
})
export class LaporanPageModule {}
