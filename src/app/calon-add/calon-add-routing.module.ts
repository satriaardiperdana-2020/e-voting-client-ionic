import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalonAddPage } from './calon-add.page';

const routes: Routes = [
  {
    path: '',
    component: CalonAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalonAddPageRoutingModule {}
