import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "ng-zorro-antd-mobile";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {ActivityTransferPage, ActivityTransferPageConstant, ActivityTransferPageSchemeInfo} from "../../pojo/activity-transfer-page";


let confirmButtonSizeChange = trigger('confirmButtonSizeChange', [
  // ...
  state('big', style({
    top: '44%',
    height: '7%',
    left: '10%',
    width: '80%',
    fontSize: '26px'
  })),
  state('normal', style({
    top: '45%',
    height: '5%',
    left: '20%',
    width: '60%',
    fontSize: '20px'
  })),
  transition('big => normal', [
    animate('0.6s')
  ]),
  transition('normal => big', [
    animate('0.6s')
  ]),
]);

@Component({
  selector: 'app-base-activity',
  templateUrl: './base-activity.component.html',
  styleUrls: ['./base-activity.component.less'],
  animations: [
    confirmButtonSizeChange
  ],
})
export class BaseActivityComponent implements OnInit {

  customerId?: string;
  activityTransferPageId?: string;
  activityTransferPage?: ActivityTransferPage;
  activityTransferPageSchemeInfo?: ActivityTransferPageSchemeInfo;
  activityTransferPageConstant: ActivityTransferPageConstant = new ActivityTransferPageConstant();

  confirmButtonSizeChangeCommander = 1;
  buttonMsg = "去会场GO!";
  content = "0-抢 百 款商 品，先到先得！ 复至: 3₳h4Vq29aXMvB₰/ 打开【Tao宝】";

  constructor(
    private http: HttpClient,
    private _toast: ToastService,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    public router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute)
  {
  }

  i = 0;

  akagi() {
    let s = this.activityTransferPageSchemeInfo ? JSON.stringify(this.activityTransferPageSchemeInfo) : "";
    console.log(s);

    let linkConvertType = this.activityTransferPage!.linkConvertType;
    let atpc = this.activityTransferPageConstant;
    if (linkConvertType == atpc.TAOBAO_CONVERT) {
      console.log("taobaoScheme")
      // @ts-ignore
      window.webkit.messageHandlers.taobaoScheme.postMessage(s);
    }
    if (linkConvertType == atpc.JINGDONG_CONVERT) {
      console.log("jingdongScheme")
      // @ts-ignore
      window.webkit.messageHandlers.jingdongScheme.postMessage(s);
    }
    if (linkConvertType == atpc.PINDUODUO_CONVERT) {
      console.log("pinduoduoScheme")
      // @ts-ignore
      window.webkit.messageHandlers.pinduoduoScheme.postMessage(s);
    }
    if (linkConvertType == atpc.ELEME_CONVERT) {
      console.log("elemeScheme")
      // @ts-ignore
      window.webkit.messageHandlers.elemeScheme.postMessage(s);
    }
    if (linkConvertType == atpc.MEITUAN_CONVERT || linkConvertType == atpc.MEITUAN_YOUXUAN_CONVERT) {
      console.log("meituanScheme")
      // @ts-ignore
      window.webkit.messageHandlers.meituanScheme.postMessage(s);
    }
    if (linkConvertType == atpc.MEITUAN_SHARE || linkConvertType == atpc.MEITUAN_YOUXUAN_SHARE || linkConvertType == atpc.ELEME_SHARE) {
      console.log("takeoutShare")
      // @ts-ignore
      window.webkit.messageHandlers.takeoutShare.postMessage(s);
    }
    if (linkConvertType == atpc.BACK_PREVIOUS_PAGE) {
      console.log("backPreviousPage")
      // @ts-ignore
      window.webkit.messageHandlers.backPreviousPage.postMessage(s);
    }
  }

  ngOnInit(): void {
    // 确定按钮大小变更动画
    setInterval(() => {
      this.confirmButtonSizeChangeCommander = -this.confirmButtonSizeChangeCommander;
    }, 600);


    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.activityTransferPageId) this.activityTransferPageId = queryParams.activityTransferPageId;
    });


    this.http.post('/api/mobile/activity/acitivityTransferPage/init?customerId=' + this.customerId + "&activityTransferPageId=" + this.activityTransferPageId, null).subscribe((res: any) => {
        if (!res.success) return;
        this.activityTransferPage = res.activityTransferPage;
        this.activityTransferPageSchemeInfo = res.activityTransferPageSchemeInfo;
      }
    );
  }

}
