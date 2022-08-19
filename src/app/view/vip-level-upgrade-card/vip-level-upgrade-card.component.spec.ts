import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipLevelUpgradeCardComponent } from './vip-level-upgrade-card.component';

describe('VipLevelUpgradeCardComponent', () => {
  let component: VipLevelUpgradeCardComponent;
  let fixture: ComponentFixture<VipLevelUpgradeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipLevelUpgradeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipLevelUpgradeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
