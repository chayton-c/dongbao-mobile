import {CustomHtmlComponent, CustomHtmlComponentConstant} from "../pojo/custom-html/custom-html-component";
import {ActivityLinkConvertInfo} from "../pojo/activity-link-convert-info";
import {Router} from "@angular/router";

export class WebkitUtil {


  static postMessage(
    operationType:number,
    activityLinkConvertInfo?: ActivityLinkConvertInfo,
    android?: number,
    pageRedirectInfo?: {
      router: Router,
      redirectUrl: string,
      customerId: string
    }
  ) {
    let customHtmlComponentConstant: CustomHtmlComponentConstant = new CustomHtmlComponentConstant();

    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";

    if (operationType == customHtmlComponentConstant.BACK_PREVIOUS_PAGE) {
      console.log("backPreviousPage")

      if (android) {
        // @ts-ignore
        window.Android.backPreviousPage('');
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.backPreviousPage.postMessage(s);
      }
      return;
    }

    if (operationType == customHtmlComponentConstant.DO_NOT_NEED_TO_CONVERT) {
      console.log("DO_NOT_NEED_TO_CONVERT")
      return;
    }
    if (operationType == customHtmlComponentConstant.TAOBAO_CONVERT) {
      console.log("taobaoScheme")


      if (android) {
        // @ts-ignore
        window.Android.taobaoScheme(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.taobaoScheme.postMessage(s);
      }
      return;
    }
    if (operationType == customHtmlComponentConstant.JINGDONG_CONVERT) {
      console.log("jingdongScheme")

      if (android) {
        // @ts-ignore
        window.Android.jingdongScheme(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.jingdongScheme.postMessage(s);
      }
      return;
    }
    if (operationType == customHtmlComponentConstant.PINDUODUO_CONVERT) {
      console.log("pinduoduoScheme")

      if (android) {
        // @ts-ignore
        window.Android.pinduoduoScheme(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.pinduoduoScheme.postMessage(s);
      }
      return;
    }
    if (
      operationType == customHtmlComponentConstant.ELEME_CONVERT
      || operationType == customHtmlComponentConstant.AMAP_CONVERT
      || operationType == customHtmlComponentConstant.JUTUIKE_CONVERT
    ) {
      console.log("elemeScheme")

      if (android) {
        // @ts-ignore
        window.Android.elemeScheme(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.elemeScheme.postMessage(s);
      }
      return;
    }

    if (operationType == customHtmlComponentConstant.MEITUAN_CONVERT) {
      console.log("meituanScheme")

      if (android) {
        // @ts-ignore
        window.Android.meituanScheme(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.meituanScheme.postMessage(s);
      }
      return;
    }
    if (
      operationType == customHtmlComponentConstant.MEITUAN_SHARE
      || operationType == customHtmlComponentConstant.JUTUIKE_SHARE
      || operationType == customHtmlComponentConstant.MEITUAN_YOUXUAN_SHARE
      || operationType == customHtmlComponentConstant.ELEME_SHARE
      || operationType == customHtmlComponentConstant.AMAP_SHARE) {
      console.log("takeoutShare")

      if (android) {
        // @ts-ignore
        window.Android.takeoutShare(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.takeoutShare.postMessage(s);
      }
      return;
    }
    if (operationType == customHtmlComponentConstant.MEITUAN_YOUXUAN_CONVERT) {
      console.log("meituanScheme")

      if (android) {
        // @ts-ignore
        window.Android.meituanScheme(s);
      } else {
        // @ts-ignore
        window.webkit.messageHandlers.meituanScheme.postMessage(s);
      }
      return;
    }
    if (operationType == customHtmlComponentConstant.REDIRECT_TO_H5) {
      window.location.href = pageRedirectInfo!.redirectUrl;
      return;
    }
    if (operationType == customHtmlComponentConstant.JUTUIKE_VIP_CARD_CONVERT || operationType == customHtmlComponentConstant.JUTUIKE_H5_CONVERT) {
      window.location.href = activityLinkConvertInfo!.url;
      return;
    }
    if (operationType == customHtmlComponentConstant.NAVIGATE_TO_OHTER_PAGE) {
      let redirectUrl = pageRedirectInfo!.redirectUrl;
      let id = WebkitUtil.getQueryVar('id', redirectUrl);

      if (android) {
        pageRedirectInfo!.router!.navigate(['/multiple-button-activity'], {
          queryParams: {
            customerId: pageRedirectInfo!.customerId,
            id: id,
            android: android,
            ios: !android
          },
        });
      } else {
        if (redirectUrl.indexOf("?") == -1)
          redirectUrl += "?a=1";
        if (redirectUrl.indexOf("customerId") == -1)
          redirectUrl += "&customerId=" + pageRedirectInfo!.customerId;
        if (redirectUrl.indexOf("ios") == -1)
          redirectUrl += "&ios=1";

        let activityLinkConvertInfo: ActivityLinkConvertInfo = {
          shareBasePictureUrl: "", url: redirectUrl, wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
          text: "", copyBeforeAction: "", title: ""
        }
        let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";
        // @ts-ignore
        window.webkit.messageHandlers.redirectToUrl.postMessage(s);
      }
      return;
    }
  }

  static getQueryVar(varName: string, href: string): string {
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

  static copyText(text: string, android: number): void {
    let activityLinkConvertInfo: ActivityLinkConvertInfo = {
      shareBasePictureUrl: "", url: "", wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
      text: text, copyBeforeAction: text, title: ""
    }
    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";

    if (android) {
      // @ts-ignore
      window.Android.copyText(s);
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.copyText.postMessage(s);
    }
    return;
  }

  static backPreviousPage(android: number): void {
    if (android) {
      // @ts-ignore
      window.Android.backPreviousPage('');
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.backPreviousPage.postMessage('');
    }
    return;
  }
}
