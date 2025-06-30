import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../../app/services/form-data.service';
import { CustomValidators } from '../../app/validators/custom-validators';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup;
  showMathField = false;
  showDescriptionField = false;
  mathError = false;
  descriptionError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {
    this.dynamicForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      lookingForJob: [true],
      specialistLevel: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Subscribe to specialist level changes
    this.dynamicForm.get('specialistLevel')?.valueChanges.subscribe(value => {
      this.onSpecialistLevelChange(value);
    });
  }

  onSpecialistLevelChange(level: string): void {
    // Remove existing conditional fields
    this.removeConditionalFields();

    this.showMathField = false;
    this.showDescriptionField = false;
    this.mathError = false;
    this.descriptionError = false;

    if (level === 'junior') {
      this.showMathField = true;
      this.dynamicForm.addControl('mathAnswer', this.fb.control('', [
        Validators.required,
        CustomValidators.mathValidator
      ]));
    } else if (level === 'mid') {
      this.showDescriptionField = true;
      this.dynamicForm.addControl('description', this.fb.control('', [
        Validators.required,
        CustomValidators.noLetterAValidator
      ]));
    }
  }

  removeConditionalFields(): void {
    if (this.dynamicForm.contains('mathAnswer')) {
      this.dynamicForm.removeControl('mathAnswer');
    }
    if (this.dynamicForm.contains('description')) {
      this.dynamicForm.removeControl('description');
    }
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      const formData = this.dynamicForm.value;
      this.formDataService.updateFormData(formData);

      if (formData.specialistLevel === 'senior') {
        this.router.navigate(['/senior-submission']);
      } else {
        // For junior and mid levels, show form data as JSON
        alert('Form Submitted!\n\n' + this.formDataService.getFormDataAsJson());
      }
    } else {
      this.markFormGroupTouched();
      this.checkFieldErrors();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.dynamicForm.controls).forEach(key => {
      const control = this.dynamicForm.get(key);
      control?.markAsTouched();
    });
  }

  checkFieldErrors(): void {
    const mathControl = this.dynamicForm.get('mathAnswer');
    const descriptionControl = this.dynamicForm.get('description');

    if (mathControl && mathControl.errors?.['mathError']) {
      this.mathError = true;
    }

    if (descriptionControl && descriptionControl.errors?.['containsA']) {
      this.descriptionError = true;
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.dynamicForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email';
      }
      if (field.errors['mathError']) {
        return 'Incorrect answer! 2+2 = 4';
      }
      if (field.errors['containsA']) {
        return 'Description cannot contain the letter "a"';
      }
    }
    return '';
  }
}
