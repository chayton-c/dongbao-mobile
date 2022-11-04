import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderRetrievalComponent } from './order-retrieval.component';

const routes: Routes = [{ path: '', component: OrderRetrievalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRetrievalRoutingModule { }
