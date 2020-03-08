import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerContentComponent } from './answer-content.component';

describe('AnswerContentComponent', () => {
  let component: AnswerContentComponent;
  let fixture: ComponentFixture<AnswerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
