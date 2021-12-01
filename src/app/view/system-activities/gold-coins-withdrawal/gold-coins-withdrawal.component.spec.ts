import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCoinsWithdrawalComponent } from './gold-coins-withdrawal.component';

describe('GoldCoinsWithdrawalComponent', () => {
  let component: GoldCoinsWithdrawalComponent;
  let fixture: ComponentFixture<GoldCoinsWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldCoinsWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldCoinsWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
