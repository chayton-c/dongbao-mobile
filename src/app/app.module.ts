import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { WechatAuthComponent } from './view/auth/wechat-auth/wechat-auth.component';
import { TestComponent } from './view/test/test.component';
import { GoldCoinsDetailComponent } from './view/system-activities/gold-coins-detail/gold-coins-detail.component';
import { EnergyDetailComponent } from './view/system-activities/energy-detail/energy-detail.component';
import { GoldCoinsWithdrawalDetailComponent } from './view/system-activities/gold-coins-withdrawal-detail/gold-coins-withdrawal-detail.component';
import { GoldCoinsWithdrawalComponent } from './view/system-activities/gold-coins-withdrawal/gold-coins-withdrawal.component';
import { ActivitiesDomainComponent } from './view/system-activities/activities-domain/activities-domain.component';

@NgModule({
  declarations: [
    AppComponent,
    WechatAuthComponent,
    TestComponent,
    GoldCoinsDetailComponent,
    EnergyDetailComponent,
    GoldCoinsWithdrawalDetailComponent,
    GoldCoinsWithdrawalComponent,
    ActivitiesDomainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
