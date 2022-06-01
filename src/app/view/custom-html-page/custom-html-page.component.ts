import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from "ng-zorro-antd-mobile";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomHtml} from "../../pojo/custom-html/custom-html";
import {CustomHtmlLayoutConstant} from "../../pojo/custom-html/custom-html-layout";
import {CustomHtmlComponent, CustomHtmlComponentConstant} from "../../pojo/custom-html/custom-html-component";
import {HttpUtils} from "../../util/http/http-util";
import {ActivityLinkConvertInfo} from "../../pojo/activity-link-convert-info";

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
  customHtmlLayoutConstant: CustomHtmlLayoutConstant = new CustomHtmlLayoutConstant();
  customHtmlComponentConstant: CustomHtmlComponentConstant = new CustomHtmlComponentConstant();
  style: string = "";
  windowWidth = window.innerWidth;
  customerId: string = "";
  id: string = "";

  ngOnInit(): void {
  }

  loadDataFromServer(): void {
    this.loading = true;
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
      this.postMessage(customHtmlComponent, share, activityLinkConvertInfo);
    });
  }

  copyText(text: string): void {
    let activityLinkConvertInfo: ActivityLinkConvertInfo = {
      shareBasePictureUrl: "", url: "", wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
      text: text, copyBeforeAction: text,
    }
    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";
    console.log("copytext")
    console.log(s)
    // @ts-ignore
    window.webkit.messageHandlers.copytext.postMessage(s);
    return;
  }

  backPreviousPage(): void {
    console.log("backPreviousPage")
    // @ts-ignore
    window.webkit.messageHandlers.backPreviousPage.postMessage('');
    return;
  }

  postMessage(customHtmlComponent: CustomHtmlComponent, share?: boolean, activityLinkConvertInfo?: ActivityLinkConvertInfo) {
    let operationType = customHtmlComponent.operationType;

    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";
    console.log(s);


    if (operationType == this.customHtmlComponentConstant.BACK_PREVIOUS_PAGE) {
      console.log("backPreviousPage")
      // @ts-ignore
      window.webkit.messageHandlers.backPreviousPage.postMessage(s);
      return;
    }

    if (operationType == this.customHtmlComponentConstant.DO_NOT_NEED_TO_CONVERT) {
      console.log("DO_NOT_NEED_TO_CONVERT")
      return;
    }
    if (operationType == this.customHtmlComponentConstant.TAOBAO_CONVERT) {
      console.log("taobaoScheme")
      // @ts-ignore
      window.webkit.messageHandlers.taobaoScheme.postMessage(s);
      return;
    }
    if (operationType == this.customHtmlComponentConstant.JINGDONG_CONVERT) {
      console.log("jingdongScheme")
      // @ts-ignore
      window.webkit.messageHandlers.jingdongScheme.postMessage(s);
      return;
    }
    if (operationType == this.customHtmlComponentConstant.PINDUODUO_CONVERT) {
      console.log("pinduoduoScheme")
      // @ts-ignore
      window.webkit.messageHandlers.pinduoduoScheme.postMessage(s);
      return;
    }
    if (
      operationType == this.customHtmlComponentConstant.ELEME_CONVERT
      || operationType == this.customHtmlComponentConstant.AMAP_CONVERT
    ) {
      console.log("elemeScheme")
      // @ts-ignore
      window.webkit.messageHandlers.elemeScheme.postMessage(s);
      return;
    }

    if (operationType == this.customHtmlComponentConstant.MEITUAN_CONVERT) {
      console.log("meituanScheme")
      // @ts-ignore
      window.webkit.messageHandlers.meituanScheme.postMessage(s);
      return;
    }
    if (
      share
      || operationType == this.customHtmlComponentConstant.MEITUAN_SHARE
      || operationType == this.customHtmlComponentConstant.MEITUAN_YOUXUAN_SHARE
      || operationType == this.customHtmlComponentConstant.ELEME_SHARE
      || operationType == this.customHtmlComponentConstant.AMAP_SHARE) {
      console.log("takeoutShare")
      // @ts-ignore
      window.webkit.messageHandlers.takeoutShare.postMessage(s);
      return;
    }
    if (operationType == this.customHtmlComponentConstant.MEITUAN_YOUXUAN_CONVERT) {
      console.log("meituanScheme")
      // @ts-ignore
      window.webkit.messageHandlers.meituanScheme.postMessage(s);
      return;
    }
    if (operationType == this.customHtmlComponentConstant.REDIRECT_TO_H5) {
      window.location.href = customHtmlComponent.functionalText;
      return;
    }
    if (operationType == this.customHtmlComponentConstant.CHANGE_CUSTOM_HTML_ID) {
      let id = this.getQueryVar('id', customHtmlComponent.functionalText);
      this.id = id!;
      console.log("id")
      this.loadDataFromServer();
      return;
    }
  }

  akagi() {
    // let s = this.activityTransferPageSchemeInfo ? JSON.stringify(this.activityTransferPageSchemeInfo) : "";
  }

  getQueryVar(varName: string, href: string): string {
    // Grab and unescape the query string - appending an '&' keeps the RegExp simple
    // for the sake of this example.
    let queryStr = unescape(href) + '&';

    // Dynamic replacement RegExp
    let regex = new RegExp('.*?[&\\?]' + varName + '=(.*?)&.*');

    // Apply RegExp to the query string
    let val = queryStr.replace(regex, "$1");

    // If the string is the same, we didn't find a match - return false
    return val == queryStr ? '' : val;
  }

}
