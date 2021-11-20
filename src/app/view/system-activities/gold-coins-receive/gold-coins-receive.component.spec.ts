import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCoinsReceiveComponent } from './gold-coins-receive.component';

describe('GoldCoinsReceiveComponent', () => {
  let component: GoldCoinsReceiveComponent;
  let fixture: ComponentFixture<GoldCoinsReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldCoinsReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldCoinsReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
