import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerolehanSuaraPage } from './perolehan-suara.page';

const routes: Routes = [
  {
    path: '',
    component: PerolehanSuaraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerolehanSuaraPageRoutingModule {}
