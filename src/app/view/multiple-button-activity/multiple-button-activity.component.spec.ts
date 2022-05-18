import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleButtonActivityComponent } from './multiple-button-activity.component';

describe('MultipleButtonActivityComponent', () => {
  let component: MultipleButtonActivityComponent;
  let fixture: ComponentFixture<MultipleButtonActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleButtonActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleButtonActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
