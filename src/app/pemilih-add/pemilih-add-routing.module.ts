import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemilihAddPage } from './pemilih-add.page';

const routes: Routes = [
  {
    path: '',
    component: PemilihAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PemilihAddPageRoutingModule {}
