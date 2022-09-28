import {Component, HostListener, OnInit} from '@angular/core';
import {FriendsHelpOrder, FriendsHelpOrderConstant} from "../../../pojo/friends-help/friends-help-order";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../../util/http/http-util";
import {WebkitUtil} from "../../../util/webkit-util";
import {min} from "rxjs/operators";
import {MsgUtil} from "../../../util/msg-util";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {


  customerId: string;
  android: number;
  friendsHelpOrders: FriendsHelpOrder[] = []
  FriendsHelpOrderConstant = FriendsHelpOrderConstant;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private platform: Platform,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#F8F8F8';
    this.titleService.setTitle("我的订单");

    this.customerId = "";
    this.android = 0;
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
    });
    let interval = setInterval(() => this.countdown(), 1000);
  }

  ngOnInit(): void {
    let detailParams = {
      customerId: this.customerId,
    }

    this.http.post('/api/mobile/friendsHelp/friendsHelpOrder/init', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.friendsHelpOrders = res.friendsHelpOrders;
      this.countdown();
    });
  }


  pay(friendsHelpOrder: FriendsHelpOrder): void {
    if (friendsHelpOrder.orderType == FriendsHelpOrderConstant.ACTIVITY_ORDER) {
      let detailParams = {
        id: friendsHelpOrder.id,
      }
      this.http.post('/api/mobile/friendsHelp/friendsHelpActivityOrder/pay', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        if (!res.success) {
          MsgUtil.showErrorMsg(this.dialog, res.msg);
          return;
        }
        res.paymentParams;
        WebkitUtil.wechatPayment(res.paymentParams, this.android);
      });
    }

    if (friendsHelpOrder.orderType == FriendsHelpOrderConstant.GOODS_ORDER) {
      let detailParams = {
        id: friendsHelpOrder.id,
      }
      this.http.post('/api/mobile/friendsHelp/friendsHelpGoodsOrder/pay', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        if (!res.success) {
          MsgUtil.showErrorMsg(this.dialog, res.msg);
          return;
        }
        res.paymentParams;
        WebkitUtil.wechatPayment(res.paymentParams, this.android);
      });
    }
  }

  finishOrder(friendsHelpOrder: FriendsHelpOrder): void {
    if (friendsHelpOrder.orderType == FriendsHelpOrderConstant.ACTIVITY_ORDER) {
      let detailParams = {
        id: friendsHelpOrder.id,
      }
      // 加载上级
      this.http.post('/api/mobile/fiendsHelp/friendsHelpActivityOrder/pay', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        if (!res.success) {
          MsgUtil.showErrorMsg(this.dialog, res.msg);
          return;
        }
        res.paymentParams;
        WebkitUtil.wechatPayment(res.paymentParams, this.android);
      });
    }

    if (friendsHelpOrder.orderType == FriendsHelpOrderConstant.GOODS_ORDER) {
      let detailParams = {
        id: friendsHelpOrder.id,
      }
      // 加载上级
      this.http.post('/api/mobile/friendsHelp/friendsHelpGoodsOrder/pay', HttpUtils.createBody(detailParams), HttpUtils.createHttpOptions()).subscribe((res: any) => {
        if (!res.success) {
          MsgUtil.showErrorMsg(this.dialog, res.msg);
        }
        res.paymentParams;
        WebkitUtil.wechatPayment(res.paymentParams, this.android);
      });
    }
  }

  countdown(): void {
    let currentTimestamp = new Date().getTime();
    for (let friendsHelpOrder of this.friendsHelpOrders) {
      friendsHelpOrder.countdown = undefined;
      if (friendsHelpOrder.endTimestamp) {
        if (currentTimestamp < friendsHelpOrder.endTimestamp) {
          let minutes : number | string = (friendsHelpOrder.endTimestamp - currentTimestamp) / 60000;
          minutes = Math.floor(minutes);
          minutes = Number(minutes) < 10 ? "0" + minutes : "" + minutes;
          let seconds : number | string = ((friendsHelpOrder.endTimestamp - currentTimestamp) % 60000) / 1000;
          seconds = Math.floor(seconds);
          seconds = Number(seconds) < 10 ? "0" + seconds : "" + seconds;
          friendsHelpOrder.countdown = minutes + ":" + seconds;
          console.log(friendsHelpOrder.countdown);
        }
      }
    }
  }
}
