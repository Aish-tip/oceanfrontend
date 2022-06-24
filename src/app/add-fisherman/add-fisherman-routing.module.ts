import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFishermanPage } from './add-fisherman.page';

const routes: Routes = [
  {
    path: '',
    component: AddFishermanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFishermanPageRoutingModule {}
