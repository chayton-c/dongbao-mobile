import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-gold-coins-withdrawal',
  templateUrl: './gold-coins-withdrawal.component.html',
  styleUrls: ['./gold-coins-withdrawal.component.less']
})
export class GoldCoinsWithdrawalComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("提现");
  }

}
