import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VipLevelUpgradeCardComponent } from './vip-level-upgrade-card.component';

const routes: Routes = [{ path: '', component: VipLevelUpgradeCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VipLevelUpgradeCardRoutingModule { }
