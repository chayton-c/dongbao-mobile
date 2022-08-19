import {CustomHtmlLayout} from "./custom-html-layout";

export interface CustomHtml {

  id: string;
  title: string;
  backgroundUrl: string; // 背景
  mainColor: string; // 主色
  secondaryColor: string; // 辅助色
  focusColor: string; // 聚焦色
  remark: string;
  authType: number; // 授权类型
  url: string;
  addTime: Date;
  udpateTime: Date;

  customHtmlLayouts: CustomHtmlLayout[];
}

export class CustomHtmlConstant {
  // authType
  public readonly DO_NOT_NEED_TO_AUTH = 0; // 点击无需调起授权
  public readonly TAOBAO_AUTH = 1; // 点击需要淘宝授权
  public readonly PINDUODUO_AUTH = 3; // 点击需要拼多多授权
}
