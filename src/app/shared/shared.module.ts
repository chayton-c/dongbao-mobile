import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {TitleComponent} from "./components/title-component/title-component";
import {CustomDialogComponent} from "./components/custom-dialog-component/custom-dialog-component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

// #region third libs

const THIRDMODULES: Array<Type<void>> = [];

// #endregion

// #region your componets & directives

const COMPONENTS: Array<Type<void>> = [TitleComponent, CustomDialogComponent];
const DIRECTIVES: Array<Type<void>> = [];

// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        // third libs
        ...THIRDMODULES,
        MatDialogModule,
        MatButtonModule
    ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
