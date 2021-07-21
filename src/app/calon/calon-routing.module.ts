import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalonPage } from './calon.page';

const routes: Routes = [
  {
    path: '',
    component: CalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalonPageRoutingModule {}
