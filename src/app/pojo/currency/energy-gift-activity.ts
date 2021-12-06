export class EnergyGiftActivity {
  id?: number;
  sourceType?: number;
  threshold?: number;
  amount?: number;
  energyType?: number; // 能量类型
  addTime?: Date;
  updateTime?: Date;

  signInStatus?: number; // 签到状态
  watchingAdCountEnergyCount?: number; // 已看了多少次视频
  currentSign?: boolean; //
}

export class EnergyGiftActivityConstant {

  // signInStatus
  public readonly MISSED = 0; // 漏签
  public readonly SIGNED = 1; // 已签到
  public readonly PENDING_SIGNED = 2; // 待签到
  public readonly CAN_NOT_SIGNED = 3; // 不可签到（没到日子）

  // sourceType
  public readonly FROM_DAILY_SIGN_IN = 3; // 循环签到
  public readonly FROM_BROWSE_MALLS = 4; // 浏览商城（点击商品：京东淘宝拼多多）送能量每日最多10个能量
  public readonly FROM_BINDING_WECHAT_OR_TEL = 5; // 绑定手机号(永久能量)
  public readonly FROM_WATCHING_MISSION_VIDEO = 6; // 看任务视频给能量,每天15次，一次一个
  public readonly FROM_WATCHING_MISSION_VIDEO_AGAIN = 7; // 视频结束后选择加倍再看广告能再给一个
  public readonly FROM_FILL_INVITE_CDOE = 8; // 填写邀请码并成功，7能量(永久能量)
}
