export interface VipLevelUpgradePagePrivilegeButton {
  id: string;
  name: string; // 名称
  h5: string; // 点击跳转的h5
  imageUrl: string;
  remark: string;
  seq: number;
  hide: number;
  addTime: Date;
  updateTime: Date;
  persistent?: boolean; // 持久状态(已插入到数据库的)
  edit: boolean;
  hasHide: boolean;
}
