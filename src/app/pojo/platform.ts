export class Platform {
  public readonly platformMap: Map<number, string> = new Map();

  constructor() {
    let platforms = [
      this.DONGBAO,
      this.JINGDONG,
      this.TAOBAO,
      this.PINDUODUO,
      this.MEITUANLIANMENG,
      this.MEITUANFENXIAO,
      this.ELEME
    ];
    platforms.forEach(x => this.platformMap.set(x.id, x.name));
  }

  public readonly DONGBAO: ConstantPlatform = {
    id: 0,
    name: '东宝'
  }

  public readonly JINGDONG: ConstantPlatform = {
    id: 1,
    name: '京东'
  }

  public readonly TAOBAO: ConstantPlatform = {
    id: 2,
    name: '淘宝'
  }

  public readonly PINDUODUO: ConstantPlatform = {
    id: 3,
    name: '拼多多'
  }
  public readonly MEITUANLIANMENG: ConstantPlatform = {
    id: 4,
    name: '美团联盟'
  }

  public readonly MEITUANFENXIAO: ConstantPlatform = {
    id: 5,
    name: '美团分销联盟'
  }

  public readonly ELEME: ConstantPlatform = {
    id: 6,
    name: '饿了么'
  }
}

export interface ConstantPlatform {
  id: number;
  name: string;
}
