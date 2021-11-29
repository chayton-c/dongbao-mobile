import {Component, OnInit} from '@angular/core';
import {GoldCoinsHeap} from "../../../pojo/gold-coins-heap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-gold-coins-receive',
  templateUrl: './gold-coins-receive.component.html',
  styleUrls: ['./gold-coins-receive.component.css']
})
export class GoldCoinsReceiveComponent implements OnInit {

  customerId: number | undefined;
  goldCoinsHeaps: GoldCoinsHeap[] = [];
  energyTimes: {
    time: string,
    status: number
  }[] = [
    {
      time: '6:00-8:00',
      status: 0
    },
    {
      time: '6:00-8:00',
      status: 1
    },
    {
      time: '6:00-8:00',
      status: 2
    },
    {
      time: '6:00-8:00',
      status: 2
    },
  ];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    let params = {
      customerId: this.customerId,
    }
    this.http.post('/api/mobile/mobileApproveAppeal/handleAppeal?_allow_anonymous=true', params, {
      headers: {
      }
    }).subscribe((res) => {
      console.log(res)
    });

    this.initHeap();
    console.log(this.goldCoinsHeaps);
    console.log(Math.random());
    this.mapGoldCoins()
  }

  initHeap(): void {
    for (let i = 0; i < 10; i++) {
      this.goldCoinsHeaps.push({
        count: i,
        top:0,
        left:0
      })
    }
  }

  mapGoldCoins() {
    for (let i = 0; i < this.goldCoinsHeaps.length; i++) {
      let goldCoinsHeap = this.goldCoinsHeaps[i];
      // 可生成钻石位置的宽度
      let leftWidth = window.innerWidth - 100;
      if (i < 3) {
        goldCoinsHeap.left = this.getRandomNumber(50, 50 + leftWidth / 3);
        goldCoinsHeap.top = this.getRandomNumber(100, 350);
      }
      if (i >= 3 && i <= 6) {
        goldCoinsHeap.left = this.getRandomNumber(50 + leftWidth / 3, 50 + leftWidth * 2 / 3);
        goldCoinsHeap.top = this.getRandomNumber(100, 350);
      }
      if (i > 6 && i <= 9) {
        goldCoinsHeap.left = this.getRandomNumber(50 + leftWidth * 2 / 3, 50 + leftWidth);
        goldCoinsHeap.top = this.getRandomNumber(100, 350);
      }
    }
  }

  akagi() {
    // @ts-ignore
    window.webkit.messageHandlers.tencentAdvertise.postMessage("akagi=2")
  }

  getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
