import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaoTestComponent } from './taobao-test.component';

describe('TaobaoTestComponent', () => {
  let component: TaobaoTestComponent;
  let fixture: ComponentFixture<TaobaoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaobaoTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaobaoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
