import { Component, OnInit } from '@angular/core';
import {FriendsHelpActivity} from "../../../pojo/friends-help/friends-help-activity";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Platform} from "@angular/cdk/platform";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpUtils} from "../../../util/http/http-util";
import {WebkitUtil} from "../../../util/webkit-util";
import {MsgUtil} from "../../../util/msg-util";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.less']
})
export class ActivitiesComponent implements OnInit {

  friendsHelpActivities: FriendsHelpActivity[] = [];
  customerId?: string;
  android: number = 0;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private platform: Platform,
    private titleService: Title,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.style.backgroundColor = '#080403';

    // this.titleService.setTitle("活动中心");
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
    });
  }

  ngOnInit(): void {
    let params = {
    }

    // 加载上级
    this.http.post('/api/mobile/friendsHelp/activity/list', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        MsgUtil.showErrorMsg(this.dialog, res.msg);
        return;
      }
      this.friendsHelpActivities = res.friendsHelpActivities;
    });
  }

  jump2ActivityInfo(friendsHelpActivity: FriendsHelpActivity) {
    if (friendsHelpActivity.id != '1' && friendsHelpActivity.id != '-1') {
      MsgUtil.showErrorMsg(this.dialog, '活动已结束');
      return;
    }

    let redirectUrl = window.location.origin + "/friends-help/activity-info?customerId="
      + this.customerId + "&id=" + friendsHelpActivity.id + "&android=" + this.android;

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
      customerId: "", redirectUrl: redirectUrl, router: this.router, title: "100元话费券免费领"
    });
  }

}
