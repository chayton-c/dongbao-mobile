import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsHelpRoutingModule } from './friends-help-routing.module';
import { FriendsHelpComponent } from './friends-help.component';


@NgModule({
  declarations: [
    FriendsHelpComponent
  ],
  imports: [
    CommonModule,
    FriendsHelpRoutingModule
  ]
})
export class FriendsHelpModule { }
