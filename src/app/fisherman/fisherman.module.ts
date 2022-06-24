import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FishermanPageRoutingModule } from './fisherman-routing.module';

import { FishermanPage } from './fisherman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FishermanPageRoutingModule
  ],
  declarations: [FishermanPage]
})
export class FishermanPageModule {}
