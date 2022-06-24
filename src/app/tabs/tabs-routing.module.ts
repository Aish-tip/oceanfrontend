import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'barcode',
        loadChildren: () => import('../barcode/barcode.module').then(m => m.BarcodePageModule)
      },
      {
        path: 'setting-tab',
        loadChildren: () => import('../setting-tab/setting-tab.module').then(m => m.SettingTabPageModule)
      },
      {
        path: 'add-items/:id',
        loadChildren: () => import('../add-items/add-items.module').then(m => m.AddItemsPageModule)
      },
      {
        path: 'add-amount',
        loadChildren: () => import('../add-amount/add-amount.module').then(m => m.AddAmountPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
