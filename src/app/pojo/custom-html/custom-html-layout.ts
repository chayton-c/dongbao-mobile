import {CustomHtmlComponent} from "./custom-html-component";

export interface CustomHtmlLayout {
  id: string;
  /**
   * @see CustomHtml
   */
  customHtmlId: string;
  layoutType: number;
  layoutHeight: number;
  seq: number;
  hide: number;
  remark: string;
  addTime: Date;
  updateTime: Date;

  // pagefields
  hasHide: boolean;

  customHtmlComponents: CustomHtmlComponent[];
}

export class CustomHtmlLayoutConstant {
  public readonly SHELL = -1; // 挡板
  public readonly TOP_NAVIGATION_BARS = 0; // 顶端导航栏
  public readonly MAIN_BUTTON = 1; // 主按钮
  public readonly SECONDARY_BUTTON = 2; // 辅助按钮
  public readonly BUTTON_LIST = 3; // 按钮组
  public readonly DESCRIPTIONS = 4; // 描述
  public readonly SHARE_PASSWORD_AND_BUTTON = 5; // 分享口令与复制按钮
}
