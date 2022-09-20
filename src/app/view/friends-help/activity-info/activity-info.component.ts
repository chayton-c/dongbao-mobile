import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../../util/http/http-util";
import {FriendsHelp} from "../../../pojo/friends-help/friends-help";
import {FriendsHelpActivity} from "../../../pojo/friends-help/friends-help-activity";

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.less']
})
export class ActivityInfoComponent implements OnInit {

  initiatingCustomerId?: string; // 助力发起人
  customerId: string; // 登录用户
  id: string;
  Math = Math;
  friendsHelps: FriendsHelp[] = []
  friendsHelpActivity: FriendsHelpActivity = {
    availableBeforeFriendsHelp: 0,
    couponAmount: 0,
    couponCount: 0,
    couponQuota: 0,
    dailyStockInitialValue: 0,
    friendsRequired: 0,
    goodsId: "",
    hide: 0,
    hourlyInventoryDecay: 0,
    id: "",
    imageUrl: "",
    detailImageUrl: "",
    rule: "",
    seq: 0,
    title: ""
  };
  password: string = "";
  startThirtyDaysLoginGoldCoinsCommission: number = 0;

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private platform: Platform,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#F9713C';

    this.customerId = "";
    this.id = "";
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.id) this.id = queryParams.id;
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.initiatingCustomerId) this.initiatingCustomerId = queryParams.initiatingCustomerId;
    });
  }

  ngOnInit(): void {
    let detailParams = {
      id: this.id,
      customerId: this.customerId,
      initiatingCustomerId: this.initiatingCustomerId
    }

    // 加载上级
    this.http.post('/api/mobile/friendsHelp/activity/detail', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
      }
      this.friendsHelpActivity = res.friendsHelpActivity;
      this.friendsHelps = res.friendsHelps;
      this.startThirtyDaysLoginGoldCoinsCommission = res.startThirtyDaysLoginGoldCoinsCommission;
    });
  }

  createPassword(): void {
    let params = {
      id: this.id,
      customerId: this.customerId
    }

    // 加载上级
    this.http.post('/api/mobile/friendsHelp/activity/createPassword', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
      }
      this.password = res.password;
    });
  }

  createFriendsHelp(): void {
    let friendsHelpParams = {
      id: this.id,
      customerId: this.customerId,
      initiatingCustomerId: this.initiatingCustomerId
    }

    // 发起助力
    this.http.post('/api/mobile/friendsHelp/activity/friendsHelp', HttpUtils.createBody(friendsHelpParams), HttpUtils.createHttpOptions())
      .subscribe((res: any) => {

      });
  }

}
