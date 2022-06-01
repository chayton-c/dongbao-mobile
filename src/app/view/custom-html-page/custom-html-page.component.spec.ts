import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHtmlPageComponent } from './custom-html-page.component';

describe('CustomHtmlPageComponent', () => {
  let component: CustomHtmlPageComponent;
  let fixture: ComponentFixture<CustomHtmlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomHtmlPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHtmlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
