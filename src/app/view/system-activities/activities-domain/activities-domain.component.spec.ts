import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesDomainComponent } from './activities-domain.component';

describe('ActivitiesDomainComponent', () => {
  let component: ActivitiesDomainComponent;
  let fixture: ComponentFixture<ActivitiesDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
