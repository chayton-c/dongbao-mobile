import {Component, OnInit} from '@angular/core';
import {GoldCoinsHeap} from "../../../pojo/gold-coins-heap";

@Component({
  selector: 'app-gold-coins-receive',
  templateUrl: './gold-coins-receive.component.html',
  styleUrls: ['./gold-coins-receive.component.css']
})
export class GoldCoinsReceiveComponent implements OnInit {

  constructor() {
  }

  bars: GoldCoinsHeap[] = [];

  ngOnInit(): void {
    this.initHeap();
    console.log(this.bars);
    console.log(Math.random());
    this.akagi()
  }

  initHeap(): void {
    for (let i = 0; i < 10; i++) {
      this.bars.push({
        count: i,
        top:0,
        left:0
      })
    }
  }

  akagi() {
    this.bars.forEach(x => {
      x.top = this.getRandomNumber(100, 400);
      x.left = this.getRandomNumber(20, window.innerWidth - 20);
    })
    console.log(this.bars);
  }

  getRandomNumber(min: number, max: number) {

    return Math.random() * (max - min) + min;

  }
}
