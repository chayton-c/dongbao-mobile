import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaobaoTestComponent } from './taobao-test.component';

const routes: Routes = [{ path: '', component: TaobaoTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaobaoTestRoutingModule { }
