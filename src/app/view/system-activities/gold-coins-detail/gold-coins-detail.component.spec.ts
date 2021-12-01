import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCoinsDetailComponent } from './gold-coins-detail.component';

describe('GoldCoinsDetailComponent', () => {
  let component: GoldCoinsDetailComponent;
  let fixture: ComponentFixture<GoldCoinsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldCoinsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldCoinsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
