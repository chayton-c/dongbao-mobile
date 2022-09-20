import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsHelpComponent } from './friends-help.component';
import { ActivitiesComponent } from './activities/activities.component';
import {CommonModule} from "@angular/common";
import { ActivityInfoComponent } from './activity-info/activity-info.component';

const routes: Routes = [
  { path: '', component: FriendsHelpComponent },
  { path: 'activities', component: ActivitiesComponent},
  { path: 'activity-info', component: ActivityInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: [

    ActivitiesComponent,
     ActivityInfoComponent
  ]
})
export class FriendsHelpRoutingModule { }
