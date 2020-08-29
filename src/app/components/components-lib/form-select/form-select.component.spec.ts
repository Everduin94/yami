import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectComponent } from './form-select.component';
import { FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponentsModule } from '../form-components.module';

describe('FormSelectComponent', () => {
  let component: FormSelectComponent;
  let fixture: ComponentFixture<FormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormComponentsModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({'deck': new FormControl('DEMO')});
    component.controlName = 'deck';
    component.selectData = [
      {value: 'DEMO'},
      {value: 'Hello!'},
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a cy tag of form-select-deck given formControlName of deck', () => {
    const compiled = fixture.debugElement.nativeElement;
    const categorySelect = compiled.querySelector('mat-select[data-cy=form-select-deck]');
    expect(categorySelect).toBeTruthy();
    /*const actual = categorySelect.value;
    const expected = "DEMO";
    expect(actual).toBe(expected);*/
  });

  // TODO: Issue setting value programmatically
  /*it('should update the input to "Hello!" given the form control is updated with "Hello!"', () => {
    const compiled = fixture.debugElement.nativeElement;
    const categorySelect = compiled.querySelector('mat-select[data-cy=form-select-category]');
    component.form.controls.category.setValue('Hello!')
    expect(categorySelect).toBeTruthy();
    const actual = categorySelect.value;
    const expected = "Hello!";
    expect(actual).toBe(expected);
  });*/
});
