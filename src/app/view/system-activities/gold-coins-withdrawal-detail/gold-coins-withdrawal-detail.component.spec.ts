import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCoinsWithdrawalDetailComponent } from './gold-coins-withdrawal-detail.component';

describe('GoldCoinsWithdrawalDetailComponent', () => {
  let component: GoldCoinsWithdrawalDetailComponent;
  let fixture: ComponentFixture<GoldCoinsWithdrawalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldCoinsWithdrawalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldCoinsWithdrawalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
