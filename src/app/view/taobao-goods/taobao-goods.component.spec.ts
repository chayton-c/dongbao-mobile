import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaoGoodsComponent } from './taobao-goods.component';

describe('TaobaoGoodsComponent', () => {
  let component: TaobaoGoodsComponent;
  let fixture: ComponentFixture<TaobaoGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaobaoGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaobaoGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
