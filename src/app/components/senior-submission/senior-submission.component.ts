import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService, FormData } from '../../services/form-data.service';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-senior-submission',
  templateUrl: './senior-submission.component.html',
  styleUrls: ['./senior-submission.component.scss']
})
export class SeniorSubmissionComponent implements OnInit {
  submissionForm: FormGroup;
  formData: FormData;
  showCoverLetterField = false;
  submitted = false;
  finalFormData = '';

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {
    this.submissionForm = this.fb.group({});
    this.formData = this.formDataService.getFormData();
  }

  ngOnInit(): void {
    // Check if user was looking for a job
    if (!this.formData.lookingForJob) {
      this.showCoverLetterField = true;
      this.submissionForm.addControl('coverLetter', this.fb.control('', [
        Validators.required,
        CustomValidators.minLengthValidator(140)
      ]));
    }
  }

  onSubmitApplication(): void {
    if (this.showCoverLetterField && this.submissionForm.invalid) {
      this.submissionForm.markAllAsTouched();
      return;
    }

    if (this.showCoverLetterField) {
      // Add cover letter to form data
      this.formDataService.updateFormData({
        coverLetter: this.submissionForm.get('coverLetter')?.value
      });
    }

    this.submitted = true;
    this.finalFormData = this.formDataService.getFormDataAsJson();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.submissionForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'Cover letter is required';
      }
      if (field.errors['minLength']) {
        const actualLength = field.errors['minLength'].actualLength;
        const requiredLength = field.errors['minLength'].requiredLength;
        return `Cover letter must be at least ${requiredLength} characters (current: ${actualLength})`;
      }
    }
    return '';
  }
}
