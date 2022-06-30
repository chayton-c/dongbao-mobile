import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VipLevelComponent } from './vip-level.component';

const routes: Routes = [{ path: '', component: VipLevelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VipLevelRoutingModule { }
