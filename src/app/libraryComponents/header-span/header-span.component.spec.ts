import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSpanComponent } from './header-span.component';

describe('HeaderSpanComponent', () => {
  let component: HeaderSpanComponent;
  let fixture: ComponentFixture<HeaderSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
