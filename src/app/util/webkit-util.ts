import {CustomHtmlComponent, CustomHtmlComponentConstant} from "../pojo/custom-html/custom-html-component";
import {ActivityLinkConvertInfo} from "../pojo/activity-link-convert-info";
import {Router} from "@angular/router";

export class WebkitUtil {

  public static NONE = 0;
  public static BACK_PREVIOUS_PAGE = 1;
  public static TAOBAO_CONVERT = 2; // 跳转淘宝
  public static JINGDONG_CONVERT = 3; // 跳转京东
  public static PINDUODUO_CONVERT = 4; // 跳转拼多多
  public static WECHAT_MINIPROGRAM = 5; // 跳转到小程序
  public static MEITUAN_WECHAT_MINIPROGRAM = 6;
  public static COPY_AND_SHARE_IMAGE_THEN_SHARE_ON_WECHAT_MINIPROGRAM = 7;
  public static TEXT_SHARE = 8;
  public static MEITUANYOUXUAN_WECHAT_MINIPROGRAM = 9;
  public static REDIRECT_TO_H5 = 10; // 重定向到h5
  public static NAVIGATE_TO_OTHER_PAGE = 11;
  public static CREATE_URL = 12;
  public static ELEME_APP = 13; // 跳转app


  static postMessageByCustomHtmlComponentOperationType(
    operationType:number,
    activityLinkConvertInfo?: ActivityLinkConvertInfo,
    android?: number,
    pageRedirectInfo?: {
      router: Router,
      redirectUrl: string,
      customerId: string
    }
  )
  {
    let customHtmlComponentConstant: CustomHtmlComponentConstant = new CustomHtmlComponentConstant();

    let webkitUtilOperationType: number;
    switch (operationType) {
      case customHtmlComponentConstant.DO_NOT_NEED_TO_CONVERT: {
        webkitUtilOperationType = WebkitUtil.NONE;
        break;
      }
      case customHtmlComponentConstant.BACK_PREVIOUS_PAGE: {
        webkitUtilOperationType = WebkitUtil.BACK_PREVIOUS_PAGE;
        break;
      }
      case customHtmlComponentConstant.TAOBAO_CONVERT: {
        webkitUtilOperationType = WebkitUtil.TAOBAO_CONVERT;
        break;
      }
      case customHtmlComponentConstant.JINGDONG_CONVERT: {
        webkitUtilOperationType = WebkitUtil.JINGDONG_CONVERT;
        break;
      }
      case customHtmlComponentConstant.PINDUODUO_CONVERT: {
        webkitUtilOperationType = WebkitUtil.PINDUODUO_CONVERT;
        break;
      }
      // case customHtmlComponentConstant.ELEME_CONVERT: {
      //   webkitUtilOperationType = WebkitUtil.ELEME_APP;
      //   break;
      // }
      case customHtmlComponentConstant.ELEME_CONVERT:
      case customHtmlComponentConstant.AMAP_CONVERT:
      case customHtmlComponentConstant.JUTUIKE_CONVERT: {
        webkitUtilOperationType = WebkitUtil.WECHAT_MINIPROGRAM;
        break;
      }

      case customHtmlComponentConstant.MEITUAN_SHARE:
      case customHtmlComponentConstant.JUTUIKE_SHARE:
      case customHtmlComponentConstant.MEITUAN_YOUXUAN_SHARE:
      case customHtmlComponentConstant.ELEME_SHARE:
      case customHtmlComponentConstant.AMAP_SHARE: {
        webkitUtilOperationType = WebkitUtil.COPY_AND_SHARE_IMAGE_THEN_SHARE_ON_WECHAT_MINIPROGRAM;
        break;
      }

      case customHtmlComponentConstant.MEITUAN_CONVERT: {
        webkitUtilOperationType = WebkitUtil.MEITUAN_WECHAT_MINIPROGRAM;
        break;
      }
      case customHtmlComponentConstant.MEITUAN_YOUXUAN_CONVERT: {
        webkitUtilOperationType = WebkitUtil.MEITUANYOUXUAN_WECHAT_MINIPROGRAM;
        break;
      }
      case customHtmlComponentConstant.REDIRECT_TO_H5:
      case customHtmlComponentConstant.JUTUIKE_VIP_CARD_CONVERT:
      case customHtmlComponentConstant.JUTUIKE_H5_CONVERT: {
        webkitUtilOperationType = WebkitUtil.REDIRECT_TO_H5;
        break;
      }
      case customHtmlComponentConstant.NAVIGATE_TO_OHTER_PAGE: {
        webkitUtilOperationType = WebkitUtil.NAVIGATE_TO_OTHER_PAGE;
        break;
      }
      case customHtmlComponentConstant.ELEME_XCX_ORIGINAL_ID: {
        webkitUtilOperationType = WebkitUtil.WECHAT_MINIPROGRAM;
        break;
      }

      default: webkitUtilOperationType = WebkitUtil.NONE;
    }
    WebkitUtil.postMessage(webkitUtilOperationType, activityLinkConvertInfo, android, pageRedirectInfo);
  }

  static postMessage(
    operationType:number,
    activityLinkConvertInfo?: ActivityLinkConvertInfo,
    android?: number,
    pageRedirectInfo?: {
      router: Router,
      redirectUrl: string,
      customerId: string,
      title?: string
    }
  ) {
    let customHtmlComponentConstant: CustomHtmlComponentConstant = new CustomHtmlComponentConstant();

    let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";

    switch (operationType) {
      case WebkitUtil.BACK_PREVIOUS_PAGE: {
        if (android) {
          // @ts-ignore
          window.Android.backPreviousPage('');
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.backPreviousPage.postMessage(s);
        }
        break;
      }
      case WebkitUtil.TAOBAO_CONVERT: {
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
      case WebkitUtil.JINGDONG_CONVERT: {
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
      case WebkitUtil.PINDUODUO_CONVERT: {
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
      case WebkitUtil.WECHAT_MINIPROGRAM: {
        console.log("WECHAT_MINIPROGRAM")

        if (android) {
          // @ts-ignore
          window.Android.elemeScheme(s);
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.elemeScheme.postMessage(s);
        }
        return;
      }
      case WebkitUtil.MEITUAN_WECHAT_MINIPROGRAM: {
        console.log("MEITUAN_WECHAT_MINIPROGRAM")

        if (android) {
          // @ts-ignore
          window.Android.meituanScheme(s);
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.meituanScheme.postMessage(s);
        }
        return;
      }
      case WebkitUtil.COPY_AND_SHARE_IMAGE_THEN_SHARE_ON_WECHAT_MINIPROGRAM: {
        console.log("COPY_AND_SHARE_IMAGE_THEN_SHARE_ON_WECHAT_MINIPROGRAM")

        if (android) {
          // @ts-ignore
          window.Android.takeoutShare(s);
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.takeoutShare.postMessage(s);
        }
        return;
      }
      case WebkitUtil.TEXT_SHARE: {
        console.log("TEXT_SHARE")

        if (android) {
          // @ts-ignore
          window.Android.textShare(s);
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.textShare.postMessage(s);
        }
        return;
      }
      case WebkitUtil.MEITUANYOUXUAN_WECHAT_MINIPROGRAM: {
        console.log("MEITUANYOUXUAN_WECHAT_MINIPROGRAM")

        if (android) {
          // @ts-ignore
          window.Android.meituanScheme(s);
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.meituanScheme.postMessage(s);
        }
        return;
      }
      case WebkitUtil.REDIRECT_TO_H5: {
        if (activityLinkConvertInfo && activityLinkConvertInfo.url)
          window.location.href = pageRedirectInfo!.redirectUrl;
        else
          window.location.href = pageRedirectInfo!.redirectUrl;
        return;
      }
      case WebkitUtil.NAVIGATE_TO_OTHER_PAGE: {
        let redirectUrl = pageRedirectInfo!.redirectUrl;
        console.log(pageRedirectInfo);
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
          console.log(s);
          // @ts-ignore
          window.webkit.messageHandlers.redirectToUrl.postMessage(s);
        }
        return;
      }
      case WebkitUtil.CREATE_URL: {
        let redirectUrl = pageRedirectInfo!.redirectUrl;
        console.log(pageRedirectInfo);

        if (android) {
          window.location.href = pageRedirectInfo!.redirectUrl;
        } else {
          if (redirectUrl.indexOf("?") == -1)
            redirectUrl += "?a=1";
          if (redirectUrl.indexOf("customerId") == -1)
            redirectUrl += "&customerId=" + pageRedirectInfo!.customerId;
          if (redirectUrl.indexOf("ios") == -1)
            redirectUrl += "&ios=1";

          let activityLinkConvertInfo: ActivityLinkConvertInfo = {
            shareBasePictureUrl: "", url: redirectUrl, wxMiniprogramOriginalId: "", wxMiniprogramPath: "", wxMiniprogramQrcodeUrl: "",
            text: "", copyBeforeAction: "", title: pageRedirectInfo!.title
          };
          let s = activityLinkConvertInfo ? JSON.stringify(activityLinkConvertInfo) : "";
          console.log(s);
          // @ts-ignore
          window.webkit.messageHandlers.redirectToUrl.postMessage(s);
        }
        return;
      }
      case WebkitUtil.ELEME_APP : {
        console.log("ELEME_APP")

        if (android) {
          // @ts-ignore
          window.Android.elemeApp(s);
        } else {
          // @ts-ignore
          window.webkit.messageHandlers.elemeApp.postMessage(s);
        }
        break;
      }
      case WebkitUtil.NONE:
      default: {
        console.log("DO_NOT_NEED_TO_CONVERT")
      }
    }

  }

  static wechatPayment(paymentParams: any, android: number) {
    console.log("wechatPayment")
    let s = paymentParams ? JSON.stringify(paymentParams) : "";

    if (android && android != 0) {
      // @ts-ignore
      window.Android.wechatPayment(s);
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.wechatPayment.postMessage(s);
    }
    return;
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
