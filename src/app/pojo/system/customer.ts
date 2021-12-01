export class Customer {

  id?: bigint;
  gender?: number; // 用户性别
  parentCustomerId?: number; // 上级用户id
  agentCustomerId?: number; // 代理用户id
  shopId?: number; // 扩展字段
  avatar?: string; // 头像
  displayName?: string; // 用户昵称
  uniqueCode?: number; // 唯一码，给三方平台用
  tel?: string; // 手机号
  wechatPublicPlatformOpid?: string; // 微信opid
  wechatCode?: string; // 微信号
  taobaoRelationId?: number; // 淘宝ralationId
  goldCoinsNumber?: number; // 用户金币
  goldCoinsIncome?: number; // 用户金币总收益
  availableCashAmount?: number; // 可提现金额（佣金）
  energy?: number; // 用户能量
  totalIncome?: number; // 用户总收益
  slaveCount?: number; // 下级数量
  maximumSlave?: number; // 下级最大数量
  agentType?: number; // 代理类型
  defaultInviteCode?: string; // 尽管用户二维码有多个，这里显示默认的
  qrcodeUrl?: string; // 用户邀请二维码url
  loginTime?: Date; // 登录时间
  addTime?: Date;
  updateTime?: Date;

  // page fields
  slaves?: Customer[] = [];
  inviteCodes?: string[] = [];
  userName?: string;
  password?: string;
  newCustomerToday?: number = 0;
  activeCustomerToday?: number = 0;
  hasRegistered?: boolean = true;

}

class CustomerConstant {

  /**
   * 正常情况下，公司不会作为前台用户参与到逻辑中。
   * 但有些表，customerId字段非空，
   * 如CommissionRecord佣金记录表，为了表示公司收益，
   * 会使用Customer.COMPANY作为CommissionRecord.customerId表示这笔记录是公司收益。
   */
  public static readonly COMPANY_RECORD_ID = -1;
  /**
   * 用户默认头像
   */
  public static readonly DEFAULT_CUSTOMER_AVATAR = "http://shenghenduooss.gohong.com/constant/default_avatar.jpg";
  // agentType
  public static readonly IS_AENGT = 1;
  public static readonly IS_NOT_AGENT = 0;
  // gender性别
  public static readonly NOT_SETTLED = 0; // 未填写
  public static readonly MALE = 1; // 男
  public static readonly FEMALE = 2; // 女
}
