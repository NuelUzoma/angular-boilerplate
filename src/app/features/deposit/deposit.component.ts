import { Component, OnInit, ViewChild } from "@angular/core";
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HlmInputDirective } from "../../../../components/ui-input-helm/src/lib/hlm-input.directive";
import { HlmFormFieldModule } from "../../../../components/ui-formfield-helm/src/index";
import { WalletService } from "../../services/wallet.service";

export interface DepositTransaction {
    amount: number,
    status: string,
    timestamp: Date
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterOutlet,
        RouterLink,
        HlmInputDirective,
        RouterLinkActive,
        HlmButtonDirective,
        HlmFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
    depositForm: FormGroup;
    paymentUrl!: string;
    reference!: string;

    // Displayed columns for deposit transactions
    displayedColumns: string[] = ['amount', 'status', 'timestamp'];
    transactions = new MatTableDataSource<DepositTransaction>([]);

    // Paginator and Sorting for the Data Table (Transactions)
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private fb: FormBuilder,
        private walletService: WalletService,
        private router: Router
    ) {
        this.depositForm = this.fb.group({
            amount: ['', Validators.required],
        });
    }

    ngOnInit() {
        // Load the transactions when components are fully loaded
        this.loadTransactions();
    }

    onSubmit(){
        if (this.depositForm.valid) {
            this.walletService.initiateDeposit(this.depositForm.value).subscribe({
                next: (response) => {
                    this.paymentUrl = response.paymentUrl;
                    this.reference = response.reference;

                    // Store the reference for later verification
                    localStorage.setItem('pendingDepositReference', response.reference);

                    // Navigate to paystack page from the deposit response
                    this.navigateToPaymentPage();

                    // Wait for 30 seconds before verifying the deposit
                    setTimeout(() => {
                        this.verifyDeposit();
                    }, 30000); // 30seconds
                },
                error: (error) => {
                    // Handle any errors that occur during the deposit initiation
                    console.error('Error initiating deposit:', error);
                }
            })
        }
    }

    navigateToPaymentPage() {
        // Navigate to a new window for paystack verification
        window.open(this.paymentUrl), '__blank';
    }

    // Verify the payment reference
    verifyDeposit() {
        // Fetch the reference from the local storage
        const reference = localStorage.getItem('pendingDepositReference');
        
        if (reference) {
            this.walletService.verifyDeposit(reference).subscribe({
                next: (response) => {
                  // Handle the successful deposit verification
                  console.log('Deposit verified successfully:', response);
                  this.router.navigate(['/dashboard']); // Reroute back to dashboard

                  // Delete the reference saved to the localStorage
                  localStorage.removeItem('pendingDepositReference');
                },
                error: (error) => {
                  // Handle any errors that occur during the deposit verification
                  console.error('Error verifying deposit:', error);
                }
            });
        }
    }

    // Retrieve deposit transactions from the database
    loadTransactions() {
        this.walletService.depositTransactions().subscribe({
          next: (data: DepositTransaction[]) => {
            this.transactions.data = data;
            this.transactions.paginator = this.paginator;
            this.transactions.sort = this.sort;
          },
          error: (error) => {
            console.error('Error fetching transactions:', error);
          }
        });
    }
}