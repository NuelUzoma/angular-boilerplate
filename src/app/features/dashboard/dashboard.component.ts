import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '../../../../components/ui-button-helm/src/lib/hlm-button.directive';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { WalletService } from '../../services/wallet.service';

// Wallet interface
export interface Wallet {
  id: number,
  balance: number,
  userId: number
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, HlmButtonDirective],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  wallet?: Wallet;

  constructor(
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.getUserBalance();
  }

  getUserBalance() {
    this.walletService.wallet().subscribe((wallet: Wallet) => {
      this.wallet = wallet;
    });
  }
}