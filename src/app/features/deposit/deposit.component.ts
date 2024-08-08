import { Component } from "@angular/core";
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { HlmInputDirective } from "../../../../components/ui-input-helm/src/lib/hlm-input.directive";
import { HlmFormFieldModule } from "../../../../components/ui-formfield-helm/src/index";
import { WalletService } from "../../services/wallet.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ReactiveFormsModule, RouterOutlet, RouterLink, HlmInputDirective, RouterLinkActive, HlmButtonDirective, HlmFormFieldModule,],
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
    depositForm: FormGroup;
    paymentUrl!: string;
    reference!: string;

    constructor(
        private fb: FormBuilder,
        private walletService: WalletService,
        private router: Router
    ) {
        this.depositForm = this.fb.group({
            amount: ['', Validators.required],
        });
    }

    onSubmit(){
        if (this.depositForm.valid) {
            this.walletService.initiateDeposit(this.depositForm.value).subscribe({
                next: (response) => {
                    this.paymentUrl = response.paymentUrl;
                    this.reference = response.reference;

                    // Navigate to paystack page from the deposit response
                    this.navigateToPaymentPage();

                    // Wait for 10 seconds before verifying the deposit
                    setTimeout(() => {
                        this.verifyDeposit();
                    }, 10000); // 10seconds
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
        this.walletService.verifyDeposit(this.reference).subscribe({
          next: (response) => {
            // Handle the successful deposit verification
            console.log('Deposit verified successfully:', response);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            // Handle any errors that occur during the deposit verification
            console.error('Error verifying deposit:', error);
          }
        });
    }
}