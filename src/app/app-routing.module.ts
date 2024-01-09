import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/penduduk',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'penduduk',
    loadChildren: () => import('./penduduk/penduduk.module').then( m => m.PendudukPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'iuran',
    loadChildren: () => import('./iuran/iuran.module').then( m => m.IuranPageModule)
  },
  {
    path: 'pesan',
    loadChildren: () => import('./pesan/pesan.module').then( m => m.PesanPageModule)
  },
  {
    path: 'updatependuduk',
    loadChildren: () => import('./updatependuduk/updatependuduk.module').then( m => m.UpdatependudukPageModule)
  },
  {
    path: 'updateinfo',
    loadChildren: () => import('./updateinfo/updateinfo.module').then( m => m.UpdateinfoPageModule)
  },
  {
    path: 'addpenduduk',
    loadChildren: () => import('./addpenduduk/addpenduduk.module').then( m => m.AddpendudukPageModule)
  },
  {
    path: 'updateiuran',
    loadChildren: () => import('./updateiuran/updateiuran.module').then( m => m.UpdateiuranPageModule)
  },
  {
    path: 'addinfo',
    loadChildren: () => import('./addinfo/addinfo.module').then( m => m.AddinfoPageModule)
  },
  {
    path: 'blok',
    loadChildren: () => import('./blok/blok.module').then( m => m.BlokPageModule)
  },
  {
    path: 'suratkeluar',
    loadChildren: () => import('./suratkeluar/suratkeluar.module').then( m => m.SuratkeluarPageModule)
  },
  {
    path: 'updatesurat',
    loadChildren: () => import('./updatesurat/updatesurat.module').then( m => m.UpdatesuratPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'updateuser',
    loadChildren: () => import('./updateuser/updateuser.module').then( m => m.UpdateuserPageModule)
  },
  {
    path: 'adduser',
    loadChildren: () => import('./adduser/adduser.module').then( m => m.AdduserPageModule)
  },
  {
    path: 'addblok',
    loadChildren: () => import('./addblok/addblok.module').then( m => m.AddblokPageModule)
  },
  {
    path: 'addpesan',
    loadChildren: () => import('./addpesan/addpesan.module').then( m => m.AddpesanPageModule)
  },
  {
    path: 'addsurat',
    loadChildren: () => import('./addsurat/addsurat.module').then( m => m.AddsuratPageModule)
  },
  {
    path: 'updatepesan',
    loadChildren: () => import('./updatepesan/updatepesan.module').then( m => m.UpdatepesanPageModule)
  },
  {
    path: 'updateblok',
    loadChildren: () => import('./updateblok/updateblok.module').then( m => m.UpdateblokPageModule)
  },
  {
    path: 'pengeluaran',
    loadChildren: () => import('./pengeluaran/pengeluaran.module').then( m => m.PengeluaranPageModule)
  },
  {
    path: 'uangkeluar',
    loadChildren: () => import('./uangkeluar/uangkeluar.module').then( m => m.UangkeluarPageModule)
  },
  {
    path: 'addiuran',
    loadChildren: () => import('./addiuran/addiuran.module').then( m => m.AddiuranPageModule)
  },
  {
    path: 'addpengeluaran',
    loadChildren: () => import('./addpengeluaran/addpengeluaran.module').then( m => m.AddpengeluaranPageModule)
  },
  {
    path: 'adduangkeluar',
    loadChildren: () => import('./adduangkeluar/adduangkeluar.module').then( m => m.AdduangkeluarPageModule)
  },
  {
    path: 'updatepengeluaran',
    loadChildren: () => import('./updatepengeluaran/updatepengeluaran.module').then( m => m.UpdatepengeluaranPageModule)
  },
  {
    path: 'updateuangkeluar',
    loadChildren: () => import('./updateuangkeluar/updateuangkeluar.module').then( m => m.UpdateuangkeluarPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
