export interface ActivityTransferPage {

  id: string;
  linkConvertType?: number; // 转链类型
  authType?: number;
  activityId?: string; // 活动id
  title?: string;
  name?: string;
  headerImageUrl?: string;
  addTime?: Date;
  updateTime?: Date;

}

export class ActivityTransferPageConstant {
  // linkConvertType
  public readonly BACK_PREVIOUS_PAGE = -1;
  public readonly DO_NOT_NEED_TO_CONVERT = 0;
  public readonly TAOBAO_CONVERT = 1;
  public readonly JINGDONG_CONVERT = 2;
  public readonly PINDUODUO_CONVERT = 3;
  public readonly ELEME_CONVERT = 4;
  public readonly MEITUAN_CONVERT = 5;
  public readonly ELEME_SHARE = 6;
  public readonly MEITUAN_SHARE = 7;
  public readonly MEITUAN_YOUXUAN_CONVERT = 8;
  public readonly MEITUAN_YOUXUAN_SHARE = 9;

}

export interface ActivityTransferPageSchemeInfo {
  url?: string;
  wechatMiniprogramPath?: string;
  wechatMiniprogramOriginalId?: string;
}
