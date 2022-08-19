export interface CustomHtmlComponent {

  id: string;
  seq: number;
  operationType: number;
  componentType: number; // 组件类型
  mainText: string; // 主要文字：按钮正文，描述标题等
  subText: string; // 辅助文字：分享文字，描述正文等
  functionalText: string; // 功能性文字：转链活动id，跳转url等
  remark: string;
  /**
   * @see CustomHtmlLayout
   */
  customHtmlLayoutId: string;
  addTime: Date;
  updateTime: Date;
}

export class CustomHtmlComponentConstant {
  // operationType
  public readonly BACK_PREVIOUS_PAGE = -1; // 回退
  public readonly DO_NOT_NEED_TO_CONVERT = 0; // 无操作
  public readonly TAOBAO_CONVERT = 1; // 淘宝转链
  public readonly JINGDONG_CONVERT = 2; // 京东转链
  public readonly PINDUODUO_CONVERT = 3; // 拼多多转链
  public readonly ELEME_CONVERT = 4; // 饿了么转链
  public readonly ELEME_SHARE = 5; // 饿了么分享
  public readonly MEITUAN_CONVERT = 6; // 美团转链
  public readonly MEITUAN_SHARE = 7; // 美团分享
  public readonly MEITUAN_YOUXUAN_CONVERT = 8; // 美团优选转链
  public readonly MEITUAN_YOUXUAN_SHARE = 9; // 美团优选分享
  public readonly AMAP_CONVERT = 10; // 高德转链
  public readonly AMAP_SHARE = 11; // 高德分享
  public readonly REDIRECT_TO_H5 = 12; // 跳转h5
  public readonly NAVIGATE_TO_OHTER_PAGE = 13; // 更换页面id
  public readonly JUTUIKE_CONVERT = 14; // 聚推客转链
  public readonly JUTUIKE_SHARE = 15; // 聚推客分享
  public readonly JUTUIKE_VIP_CARD_CONVERT = 16; // 聚推客会员卡转链
  public readonly JUTUIKE_H5_CONVERT = 17; // 聚推客h5转链
  public readonly JUTUIKE_H5_SHARE = 18; // 聚推客h5分享


  // componentType
  public readonly COMPONENT_TYPE_1 = 1;
  public readonly COMPONENT_TYPE_2 = 2;
  public readonly COMPONENT_TYPE_3 = 3;
  public readonly COMPONENT_TYPE_4 = 4;
}
