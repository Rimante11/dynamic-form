import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FormData {
  name: string;
  surname: string;
  email: string;
  lookingForJob: boolean;
  specialistLevel: 'junior' | 'mid' | 'senior' | '';
  mathAnswer?: number;
  description?: string;
  coverLetter?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<FormData>({
    name: '',
    surname: '',
    email: '',
    lookingForJob: true,
    specialistLevel: ''
  });

  public formData$: Observable<FormData> = this.formDataSubject.asObservable();

  constructor() { }

  updateFormData(data: Partial<FormData>): void {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next({ ...currentData, ...data });
  }

  getFormData(): FormData {
    return this.formDataSubject.value;
  }

  resetFormData(): void {
    this.formDataSubject.next({
      name: '',
      surname: '',
      email: '',
      lookingForJob: true,
      specialistLevel: ''
    });
  }

  getFormDataAsJson(): string {
    return JSON.stringify(this.formDataSubject.value, null, 2);
  }
}
