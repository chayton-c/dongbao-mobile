import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomHtml} from "../../pojo/custom-html/custom-html";
import {CustomHtmlLayoutConstant} from "../../pojo/custom-html/custom-html-layout";
import {CustomHtmlComponent, CustomHtmlComponentConstant} from "../../pojo/custom-html/custom-html-component";
import {HttpUtils} from "../../util/http/http-util";
import {ActivityLinkConvertInfo} from "../../pojo/activity-link-convert-info";
import {WebkitUtil} from "../../util/webkit-util";

@Component({
  selector: 'app-custom-html-page',
  templateUrl: './custom-html-page.component.html',
  styleUrls: ['./custom-html-page.component.less']
})
export class CustomHtmlPageComponent implements OnInit {

  constructor(
    private _toast: ToastService,
    private http: HttpClient,
    public cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.id) this.id = queryParams.id;
      if (queryParams.customerId) this.customerId = queryParams.customerId;
      if (queryParams.android) this.android = queryParams.android;
      if (queryParams.ios) this.ios = queryParams.ios;

      this.loadDataFromServer();
    });
  }


  loading = false;
  customHtml: CustomHtml = {
    customHtmlLayouts: [],
    addTime: new Date(),
    authType: 0,
    backgroundUrl: "",
    focusColor: "",
    id: "",
    mainColor: "",
    remark: "",
    secondaryColor: "",
    title: "",
    udpateTime: new Date(),
    url: ""
  }
  WebkitUtils = WebkitUtil;
  customHtmlLayoutConstant: CustomHtmlLayoutConstant = new CustomHtmlLayoutConstant();
  customHtmlComponentConstant: CustomHtmlComponentConstant = new CustomHtmlComponentConstant();
  style: string = "";
  windowWidth = window.innerWidth;
  customerId: string = "";
  android: number = 0;
  ios: number = 0;
  id: string = "";

  ngOnInit(): void {
  }

  loadDataFromServer(): void {
    // this.loading = true;
    let params = {
      id: this.id,
      customerId: this.customerId
    }

    this.http.post('/api/mobile/customHtml/init', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
      }
      this.customHtml = res.customHtml;
      this.loading = false;
      document.body.style.backgroundColor = this.customHtml.mainColor;
    });
  }

  parseComponent(customHtmlComponent: CustomHtmlComponent, share?: boolean) {
    let params = {
      id: customHtmlComponent.id,
      customerId: this.customerId
    }

    this.http.post('/api/mobile/custumHtmlComponent/parse', HttpUtils.createBody(params), HttpUtils.createHttpOptions()).subscribe((res: any) => {
      if (!res.success) {
        // this._toast.fail("网络繁忙，请稍后再试!" + res.msg);
        return;
      }

      let activityLinkConvertInfo: ActivityLinkConvertInfo = res.activityLinkConvertInfo;
      let operationType = customHtmlComponent.operationType;
      if (share)
        operationType = this.customHtmlComponentConstant.ELEME_SHARE;

      if (operationType == this.customHtmlComponentConstant.NAVIGATE_TO_OHTER_PAGE) {
        this.id = WebkitUtil.getQueryVar('id', customHtmlComponent.functionalText);
        this.loadDataFromServer();
        return;
      }

      WebkitUtil.postMessage(operationType, activityLinkConvertInfo, this.android, {
        router: this.router,
        redirectUrl: customHtmlComponent.functionalText,
        customerId: this.customerId
      });
    });
  }

}
