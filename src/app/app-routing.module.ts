import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';
import { NoauthGuard } from '../app/guard/noauth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [NoauthGuard] },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule), canActivate: [NoauthGuard] },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },
  {
    path: 'barcode',
    loadChildren: () => import('./barcode/barcode.module').then(m => m.BarcodePageModule)
  },
  {
    path: 'fisherman',
    loadChildren: () => import('./fisherman/fisherman.module').then(m => m.FishermanPageModule)
  },
  {
    path: 'add-fisherman',
    loadChildren: () => import('./add-fisherman/add-fisherman.module').then(m => m.AddFishermanPageModule)
  },
  {
    path: 'setting-tab',
    loadChildren: () => import('./setting-tab/setting-tab.module').then(m => m.SettingTabPageModule)
  },
  {
    path: 'add-items/:id',
    loadChildren: () => import('./add-items/add-items.module').then(m => m.AddItemsPageModule)
  },
  {
    path: 'add-amount',
    loadChildren: () => import('./add-amount/add-amount.module').then( m => m.AddAmountPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
