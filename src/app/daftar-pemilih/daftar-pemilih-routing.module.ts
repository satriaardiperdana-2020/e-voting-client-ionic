import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarPemilihPage } from './daftar-pemilih.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarPemilihPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarPemilihPageRoutingModule {}
