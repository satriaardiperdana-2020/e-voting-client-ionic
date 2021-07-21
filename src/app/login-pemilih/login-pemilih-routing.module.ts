import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPemilihPage } from './login-pemilih.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPemilihPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPemilihPageRoutingModule {}
