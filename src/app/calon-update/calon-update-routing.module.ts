import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalonUpdatePage } from './calon-update.page';

const routes: Routes = [
  {
    path: '',
    component: CalonUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalonUpdatePageRoutingModule {}
