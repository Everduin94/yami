import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckInputComponent } from './deck-input.component';

describe('DeckInputComponent', () => {
  let component: DeckInputComponent;
  let fixture: ComponentFixture<DeckInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
