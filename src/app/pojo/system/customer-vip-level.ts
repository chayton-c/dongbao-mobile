export interface CustomerVipLevel {


  id: string;
  customerId: string;
  agentExpireDate?: Date;
  level1VipExpireDate?: Date;
  takeoutVipExpireDate?: Date;
  addTime?: Date;
  updateTime?: Date;
}
