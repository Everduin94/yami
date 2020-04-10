import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextareaComponent } from './form-textarea.component';
import { FormComponentsModule } from '../form-components.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl } from '@angular/forms';

describe('FormTextareaComponent', () => {
  let component: FormTextareaComponent;
  let fixture: ComponentFixture<FormTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormComponentsModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextareaComponent);
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
    const titleInput = compiled.querySelector('textarea[data-cy="form-textarea-title"]');
    expect(titleInput).toBeTruthy();

    component.form.controls.title.setValue('Hello!')
    const actual = titleInput.value;
    const expected = "Hello!";
    expect(actual).toBe(expected);
  });
});
