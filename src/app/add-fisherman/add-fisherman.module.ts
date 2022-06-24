import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFishermanPageRoutingModule } from './add-fisherman-routing.module';

import { AddFishermanPage } from './add-fisherman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFishermanPageRoutingModule
  ],
  declarations: [AddFishermanPage]
})
export class AddFishermanPageModule {}
