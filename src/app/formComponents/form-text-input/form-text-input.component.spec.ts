import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextInputComponent } from './form-text-input.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormComponentsModule } from '../form-components.module';
import { FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormTextInputComponent', () => {
  let component: FormTextInputComponent;
  let fixture: ComponentFixture<FormTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormComponentsModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      'title': new FormControl('DEMO')
    });
    component.controlName = 'title';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the input to "Hello!" given the form control is updated with "Hello!"', () => {
    const compiled = fixture.debugElement.nativeElement;
    const titleInput = compiled.querySelector('input[data-cy="form-text-input-title"]');
    expect(titleInput).toBeTruthy();

    component.form.controls.title.setValue('Hello!')
    const actual = titleInput.value;
    const expected = "Hello!";
    expect(actual).toBe(expected);
  });
});
