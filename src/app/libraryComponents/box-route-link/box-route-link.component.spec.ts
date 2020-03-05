import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxRouteLinkComponent } from './box-route-link.component';

describe('BoxRouteLinkComponent', () => {
  let component: BoxRouteLinkComponent;
  let fixture: ComponentFixture<BoxRouteLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxRouteLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxRouteLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
