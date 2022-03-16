import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalQuestionsComponent } from './normal-questions.component';

describe('NormalQuestionsComponent', () => {
  let component: NormalQuestionsComponent;
  let fixture: ComponentFixture<NormalQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
