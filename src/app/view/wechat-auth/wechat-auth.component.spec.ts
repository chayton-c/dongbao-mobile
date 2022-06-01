import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatAuthComponent } from './wechat-auth.component';

describe('WechatAuthComponent', () => {
  let component: WechatAuthComponent;
  let fixture: ComponentFixture<WechatAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WechatAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
