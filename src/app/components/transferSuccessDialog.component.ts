import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-transfer-success-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Transfer Successful</h2>
        <mat-dialog-content>Your transfer has been completed successfully.</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">OK</button>
        </mat-dialog-actions>
    `,
})
export class TransferSuccessDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<TransferSuccessDialogComponent>
    ) {}
}