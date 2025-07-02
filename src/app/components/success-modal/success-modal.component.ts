import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface SuccessModalData {
  title: string;
  message: string;
  showData?: boolean;
  data?: string;
}

@Component({
    selector: 'app-success-modal',
    templateUrl: './success-modal.component.html',
    styleUrls: ['./success-modal.component.scss'],
    standalone: false
})
export class SuccessModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessModalData
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
