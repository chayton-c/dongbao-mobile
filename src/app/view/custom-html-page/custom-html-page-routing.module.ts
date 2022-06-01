import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomHtmlPageComponent } from './custom-html-page.component';

const routes: Routes = [{ path: '', component: CustomHtmlPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomHtmlPageRoutingModule { }
