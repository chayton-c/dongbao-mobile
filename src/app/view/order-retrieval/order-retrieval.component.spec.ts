import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRetrievalComponent } from './order-retrieval.component';

describe('OrderRetrievalComponent', () => {
  let component: OrderRetrievalComponent;
  let fixture: ComponentFixture<OrderRetrievalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRetrievalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
