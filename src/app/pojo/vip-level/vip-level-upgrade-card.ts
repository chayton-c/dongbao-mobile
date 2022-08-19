export interface VipLevelUpgradeCard {

  id: string;
  cardNo: string;
  vipLevelId: string;
  holderCustomerId: string; // 持有人
  holderName: string;
  holderAvatar: string;
  holderTel: string;
  userCustomerId: string; // 使用人
  userInviteCode: string;
  userName: string;
  userAvatar: string;
  userTel: string;
  alreadyUsed: number;
  restDays: number;
  remark: string;
  addTime: Date;
  updateTime: Date;
}
