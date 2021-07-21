import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemilihPage } from './pemilih.page';

const routes: Routes = [
  {
    path: '',
    component: PemilihPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PemilihPageRoutingModule {}
