import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePemilihPage } from './home-pemilih.page';

const routes: Routes = [
  {
    path: '',
    component: HomePemilihPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePemilihPageRoutingModule {}
