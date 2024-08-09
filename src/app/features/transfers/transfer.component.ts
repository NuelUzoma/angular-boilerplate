import { Component, OnInit, ViewChild } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HlmInputDirective } from "../../../../components/ui-input-helm/src/lib/hlm-input.directive";
import { HlmFormFieldModule } from "../../../../components/ui-formfield-helm/src/index";
import { WalletService } from "../../services/wallet.service";
import { TransferSuccessDialogComponent } from "../../components/transferSuccessDialog.component";

export interface DebitTransaction {
    recipientId: number,
    amount: number,
    transactionType: string,
    timestamp: Date
}

export interface CreditTransaction {
    recipientId: number,
    amount: number,
    transactionType: string,
    timestamp: Date
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        HlmButtonDirective,
        HlmFormFieldModule,
        HlmInputDirective,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
    transferForm: FormGroup;

    // Displayed columns for deposit transactions
    displayedColumns: string[] = ['recipientId', 'amount', 'transactionType', 'timestamp'];
    debitTransactions = new MatTableDataSource<DebitTransaction>([]);
    creditTransactions = new MatTableDataSource<CreditTransaction>([]);

    // Paginator and Sorting for the Data Table (Transactions)
    @ViewChild('debitPaginator') debitPaginator!: MatPaginator;
    @ViewChild('debitSort') debitSort!: MatSort;
    @ViewChild('creditPaginator') creditPaginator!: MatPaginator;
    @ViewChild('creditSort') creditSort!: MatSort;

    constructor(
        private fb: FormBuilder,
        private walletService: WalletService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.transferForm = this.fb.group({
            amount: ['', Validators.required],
            recipientUserId: ['', Validators.required],
            idempotencyKey: [],
        });
    }

    ngOnInit() {
        // Set the random idempotency key in the transfer form
        this.transferForm.patchValue({
            idempotencyKey: this.generateIdempotencyKey()
        });

        // Load the transactions when components are fully loaded
        this.loadTransactions();
    }

    // generate the idempotency key using uuidv4
    generateIdempotencyKey(): string {
        return uuidv4();
    }

    onSubmit() {
        if (this.transferForm.valid) {
            this.walletService.transfer(this.transferForm.value).subscribe({
                next: (response) => {
                    console.log('Transfer Successful', response);

                    // Display a dialog box when the transfer is successful
                    if (response.message === "Transfer Successful") {
                        this.openSuccessDialog();
                        this.router.navigate(['/dashboard']);
                    }

                    // Reset the form and generate a new idempotency key for the next transfer
                    this.resetForm();
                },
                error: (error) => {
                    console.error('Transfer failed', error);
                }
            })
        }
    }

    private resetForm() {
        this.transferForm.reset(); // reset the form
        this.transferForm.patchValue({
          idempotencyKey: this.generateIdempotencyKey()
        }); // Patch another idempotency key for new transfers
    }

    // Display a success dialog after the transfer is complete
    openSuccessDialog(): void {
        this.dialog.open(TransferSuccessDialogComponent, {
          width: '250px'
        });
    }

    // Retrieve debit and credit transactions
    loadTransactions() {
        this.walletService.debitTransactions().subscribe({
            next: (debitData: DebitTransaction[]) => {
                this.debitTransactions.data = debitData;
                this.debitTransactions.paginator = this.debitPaginator;
                this.debitTransactions.sort = this.debitSort;
            },
            error: (error) => {
                console.error('Error fetching debit transactions:', error);
            }
        });

        this.walletService.creditTransactions().subscribe({
            next: (creditData: CreditTransaction[]) => {
                this.creditTransactions.data = creditData;
                this.creditTransactions.paginator = this.creditPaginator;
                this.creditTransactions.sort = this.creditSort;
            },
            error: (error) => {
                console.error('Error fetching credit transactions:', error);
            }
        });
    }
}