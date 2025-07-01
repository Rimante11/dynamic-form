import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormDataService } from '../../services/form-data.service';
import { CustomValidators } from '../../validators/custom-validators';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup;
  showMathField = false;
  showDescriptionField = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private dialog: MatDialog
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
    this.dynamicForm.get('specialistLevel')?.valueChanges.subscribe(value => {
      this.onSpecialistLevelChange(value);
    });
  }

  onSpecialistLevelChange(level: string): void {
    this.removeConditionalFields();

    this.showMathField = false;
    this.showDescriptionField = false;

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
      } else if (formData.specialistLevel === 'junior') {
        this.openSuccessModal('Application Submitted!', 'Thank you for your application. We will review it and get back to you soon.');
      } else {
        this.openSuccessModal('Form Submitted!', 'Your application has been submitted successfully.');
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.dynamicForm.controls).forEach(key => {
      const control = this.dynamicForm.get(key);
      control?.markAsTouched();
    });
  }

  openSuccessModal(title: string, message: string, showData: boolean = false, data?: string): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: title,
        message: message,
        showData: showData,
        data: data
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.dynamicForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        if (fieldName === 'mathAnswer') {
          return 'Number required';
        }
        if (fieldName === 'specialistLevel') {
          return 'Specialist level is required';
        }
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
