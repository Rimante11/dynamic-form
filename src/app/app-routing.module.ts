import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SeniorSubmissionComponent } from './components/senior-submission/senior-submission.component';

const routes: Routes = [
  { path: '', component: DynamicFormComponent },
  { path: 'senior-submission', component: SeniorSubmissionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
