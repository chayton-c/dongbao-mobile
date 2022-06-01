import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalQuestionsComponent } from './normal-questions.component';

const routes: Routes = [{ path: '', component: NormalQuestionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormalQuestionsRoutingModule { }
