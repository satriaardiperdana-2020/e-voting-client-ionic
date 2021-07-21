import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemilihUpdatePage } from './pemilih-update.page';

const routes: Routes = [
  {
    path: '',
    component: PemilihUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PemilihUpdatePageRoutingModule {}
