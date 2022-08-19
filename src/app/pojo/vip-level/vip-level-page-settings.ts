export interface VipLevelPageSettings {
  id: string;
  tmallCoupon1HtmlUrl: string; // 天猫优惠券1H5Url
  tmallCoupon2HtmlUrl: string; // 天猫优惠券2H5Url
  tmallCoupon3HtmlUrl: string; // 天猫优惠券3H5Url
  customerCenterShowVipLevelButtons: number; // Constant.TRUE个人中心显示vip内购按钮，Constant.FALSE不显示
  customerCenterAgentUpgradeHtmlUrl: string; // 个人中心代理升级按钮链接
  customerCenterLevel1VipUpgradeHtmlUrl: string; // 个人中心超级会员升级按钮链接
  addTime: Date;
  updateTime: Date;
}
