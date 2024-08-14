import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { HlmButtonDirective } from '../../../../components/ui-button-helm/src/lib/hlm-button.directive';
import { WalletService } from '../../services/wallet.service';
import { DepositCardTemplate } from '../../components/depositCard.component';
import { TransferCardTemplate } from '../../components/transferCard.component';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';

// Wallet interface
export interface Wallet {
  id: number,
  balance: number,
  userId: number
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      HlmButtonDirective,
      DepositCardTemplate,
      TransferCardTemplate,
      CardModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  wallet?: Wallet;

  constructor(
    private walletService: WalletService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserBalance();
  }

  getUserBalance() {
    this.walletService.wallet().subscribe((wallet: Wallet) => {
      this.wallet = wallet;
    });
  }

  onSubmit() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout Successful', response);

        // Redirect to home page after logout is successful
        if (response.message === 'Logout Successful') {
          this.router.navigate(['/']); // Redirect to home
        }
      },
      error: (error) => {
        console.log('Logout Error', error);
      }
    })
  }
}