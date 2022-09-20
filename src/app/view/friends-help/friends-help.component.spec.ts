import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsHelpComponent } from './friends-help.component';

describe('FriendsHelpComponent', () => {
  let component: FriendsHelpComponent;
  let fixture: ComponentFixture<FriendsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
