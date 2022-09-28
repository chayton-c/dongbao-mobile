import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityInfoRoutingModule } from './activity-info-routing.module';
import { ActivityInfoComponent } from './activity-info.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ActivityInfoComponent
  ],
  imports: [
    CommonModule,
    ActivityInfoRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ActivityInfoModule { }
