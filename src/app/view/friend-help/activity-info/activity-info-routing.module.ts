import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityInfoComponent } from './activity-info.component';

const routes: Routes = [{ path: '', component: ActivityInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityInfoRoutingModule { }
