import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../../util/http/http-util";
import {FriendsHelp} from "../../../pojo/friends-help/friends-help";
import {FriendsHelpActivity} from "../../../pojo/friends-help/friends-help-activity";
import {Customer} from "../../../pojo/system/customer";
import {WebkitUtil} from "../../../util/webkit-util";
import {MatDialog} from "@angular/material/dialog";
import {MsgUtil} from "../../../util/msg-util";

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.less']
})
export class ActivityInfoComponent implements OnInit {

  // 好友发起助力
  initiatingCustomerId?: string; // 助力发起人
  initiatingCustomer?: Customer;
  initiaingCustomerFriendsHelp = false;
  initiaingCustomerFriendsHelpCanceled = false;
  initiaingCustomerFriendsSend = false;
  messageTitle: string = "";
  messageContnet: string = "";
  hasSettlementRecord = false;

  customerId: string; // 登录用户
  id: string;
  android: number = 0;
  Math = Math;
  friendsHelps: FriendsHelp[] = [];
  friendsHelpsCount = 0;
  friendsHelpActivity: FriendsHelpActivity = {
    canBePurchased: 0, detailImageUrl: "", friendsRequired: 0, id: "", imageUrl: "", price: 0, rule: "", seq: 0, title: ""
  };
  password: string = "";
  startThirtyDaysLoginGoldCoinsCommission: number = 0;
  loading = false;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private titleService: Title,
    public dialog: MatDialog,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#F9713C';

    this.titleService.setTitle("100元话费券免费领");
    this.customerId = "";
    this.id = "";
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.id) this.id = queryParams.id;
      if (queryParams.friendsHelpActivityId) this.id = queryParams.friendsHelpActivityId;
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.initiatingCustomerId) this.initiatingCustomerId = queryParams.initiatingCustomerId;
      if (queryParams.android) this.android = queryParams.android;
    });
  }

  ngOnInit(): void {
    let detailParams = {
      id: this.id,
      customerId: this.customerId,
      initiatingCustomerId: this.initiatingCustomerId
    }

    this.http.post('/api/mobile/friendsHelp/activity/detail', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.friendsHelpActivity = res.friendsHelpActivity;
      this.friendsHelps = res.friendsHelps;
      this.hasSettlementRecord = res.hasSettlementRecord;

      this.friendsHelpsCount = this.friendsHelps ? this.friendsHelps.length : 0;

      console.log(this.friendsHelpActivity.friendsRequired > this.friendsHelpsCount);
      if (this.friendsHelpActivity.friendsRequired > this.friendsHelpsCount) {
        for (let i = 0; i < this.friendsHelpActivity.friendsRequired - this.friendsHelpsCount; i++) {
          this.friendsHelps.push({
            customerId: "",
            friendsAvatar: "http://shenghenduooss.gohong.com/dongbao-mobile/friends-help/activity-info/default-avatar.png",
            friendsCustomerId: "", friendsHelpActivityId: "", friendsName: "", id: ""
          });
          console.log(this.friendsHelps);
        }
      }

      this.startThirtyDaysLoginGoldCoinsCommission = res.startThirtyDaysLoginGoldCoinsCommission;
      this.initiatingCustomer = res.initiatingCustomer;
      this.initiaingCustomerFriendsHelp = !!res.initiatingCustomer;
    });
  }

  createPassword(): void {
    this.loading = true;
    let params = {
      id: this.id,
      customerId: this.customerId
    }

    // 加载上级
    this.http.post('/api/mobile/friendsHelp/activity/createPassword', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.loading = false;
      this.password = res.password;
      WebkitUtil.postMessage(
        WebkitUtil.TEXT_SHARE, {
          copyBeforeAction: "", shareBasePictureUrl: "", url: "", wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
          text: this.password
        }, this.android
      )
    });
  }

  jump2Purchase():void {
    let redirectUrl = window.location.origin + "/friends-help/purchase?customerId="
      + this.customerId + "&android=" + this.android;

    WebkitUtil.postMessage(WebkitUtil.CREATE_URL, {
      copyBeforeAction: "",
      shareBasePictureUrl: "",
      text: "",
      title: "",
      url: "",
      wxMiniprogramOriginalId: "",
      wxMiniprogramPath: "",
      wxMiniprogramQrcodeUrl: ""
    }, this.android, {
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "充值中心"
    });
  }

  createFriendsHelp(): void {
    if (!this.initiatingCustomerId) return;
    this.initiaingCustomerFriendsSend = true;


    let friendsHelpParams = {
      id: this.id,
      customerId: this.customerId,
      initiatingCustomerId: this.initiatingCustomerId
    }

    // 发起助力
    this.http.post('/api/mobile/friendsHelp/activity/friendsHelp', HttpUtils.createBody(friendsHelpParams), HttpUtils.createHttpOptions())
      .subscribe((res: any) => {
        // if (!res.success) {
        //   this.messageTitle = "助力失败";
        //   this.messageContnet = "活动参与火爆，请稍后再试..";
        //   return;
        // }

        this.messageTitle = res.messageTitle;
        this.messageContnet = res.messageContnet;
      });
  }

  payment(): void {
    this.loading = true;
    let params = {
      friendsHelpActivityId: this.id,
      customerId: this.customerId
    }

    // 加载上级
    this.http.post('/api/mobile/fiendsHelp/friendsHelpActivityOrder/createOrder', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      this.loading = false;
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      WebkitUtil.wechatPayment(res.paymentParams, this.android);
    });
  }

}
