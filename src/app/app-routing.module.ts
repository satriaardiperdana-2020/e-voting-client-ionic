import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login-admin',
    loadChildren: () => import('./login-admin/login-admin.module').then( m => m.LoginAdminPageModule)
  },
  {
    path: 'login-pemilih',
    loadChildren: () => import('./login-pemilih/login-pemilih.module').then( m => m.LoginPemilihPageModule)
  },
  {
    path: 'home-admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'home-pemilih',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home-pemilih/home-pemilih.module').then( m => m.HomePemilihPageModule)
  },
  {
    path: 'daftar-pemilih',
    loadChildren: () => import('./daftar-pemilih/daftar-pemilih.module').then( m => m.DaftarPemilihPageModule)
  },
  {
    path: 'calon',
    canActivate: [AdminGuard],
    loadChildren: () => import('./calon/calon.module').then( m => m.CalonPageModule)
  },
  {
    path: 'calon/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./calon/calon.module').then( m => m.CalonPageModule)
  },
  {
    path: 'calon-add',
    canActivate: [AdminGuard],
    loadChildren: () => import('./calon-add/calon-add.module').then( m => m.CalonAddPageModule)
  },
  {
    path: 'calon-update/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./calon-update/calon-update.module').then( m => m.CalonUpdatePageModule)
  },
  {
    path: 'pemilih',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pemilih/pemilih.module').then( m => m.PemilihPageModule)
  },
  {
    path: 'pemilih/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pemilih/pemilih.module').then( m => m.PemilihPageModule)
  },
  {
    path: 'pemilih-add',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pemilih-add/pemilih-add.module').then( m => m.PemilihAddPageModule)
  },
  {
    path: 'pemilih-update/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pemilih-update/pemilih-update.module').then( m => m.PemilihUpdatePageModule)
  },
  {
    path: 'laporan',
    canActivate: [AdminGuard],
    loadChildren: () => import('./laporan/laporan.module').then( m => m.LaporanPageModule)
  },
  {
    path: 'diagram',
    canActivate: [AdminGuard],
    loadChildren: () => import('./diagram/diagram.module').then( m => m.DiagramPageModule)
  },
  {
    path: 'voting',
    canActivate: [AuthGuard],
    loadChildren: () => import('./voting/voting.module').then( m => m.VotingPageModule)
  },
  {
    path: 'perolehan-suara',
    canActivate: [AuthGuard],
    loadChildren: () => import('./perolehan-suara/perolehan-suara.module').then( m => m.PerolehanSuaraPageModule)
  },
  {
    path: 'profil/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
