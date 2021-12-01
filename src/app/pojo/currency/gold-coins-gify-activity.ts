export class GoldCoinsGifyActivity {


  id?: number;
  sourceType?: number;
  threshold?: number;
  startTime?: Date;
  endTime?: Date;
  amount?: number;
  addTime?: Date;
  updateTime?: Date;

  // pageFields
  receiveStatus?: number;
}

export class GoldCoinsGiftActivityConstant {
  // sourceType
  public readonly FROM_DOWN_LOADING_APP = 0; // 下载app（app首次登陆）
  public readonly START_THIRTY_DAYS_LOGIN = 1; // 前三十天登录送金币，第一次登陆送18000，剩余三十天内登陆16次，每次送9000（这个登录就送，不是签到，签到要点按钮，这个不用）
  public readonly FROM_RECEVE_AT_FIX_TIME = 2; // 固定时间段领取
  public readonly FROM_INVITING_SLAVES = 3; // 成功邀请下级时，获取金币
  public readonly FROM_WATCHING_ADS_WHEN_RECEIVING_GOLD_COIS = 4; // 收金币时候看广告，每天24堆金币中有10堆是可以看广告加倍的

  // receiveStatus
  public readonly MISSED = 0; // 漏领
  public readonly RECEIVED = 1; // 已领
  public readonly PENDING_RECEIVE = 2; // 待领取
  public readonly CAN_NOT_RECEIVE = 3; // 不可领取
}
