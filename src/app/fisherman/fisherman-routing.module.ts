import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FishermanPage } from './fisherman.page';

const routes: Routes = [
  {
    path: '',
    component: FishermanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FishermanPageRoutingModule {}
