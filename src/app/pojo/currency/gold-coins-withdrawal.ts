export interface GoldCoinsWithdrawal {
  id: string;
  checkType?: number; // 检验类型
  threshold?: number; // 检验阈值
  amountLimit?: number; // 检验通过后的可提现金额
  addTime?: Date;
  updateTime?: Date;

  // page field
  enable: boolean;
}

export class GoldCoinsWithdrawalConstant {
  // checkType
  public readonly FIRST_WITHDRAWN = 0; // 初次提现
  public readonly BALANCE = 1; // 根据余额校验
  public readonly ENERGY_GROWTH = 2; // 根据能量增长量校验
}
