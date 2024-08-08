import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    constructor(
        private httpClient: HttpClient
    ) {}

    private walletUrl = 'http://localhost:5052/api/wallet';
    private initiateDepositUrl = 'http://localhost:5052/api/wallet/initiate-deposit';
    private verifyDepositUrl = 'http://localhost:5052/api/wallet/verify-deposit';
    private transferUrl = 'http://localhost:5052/api/wallet/transfer';

    // Retrieve wallet details request
    wallet(): Observable<any> {
        return this.httpClient.get(this.walletUrl);
    }

    // Intitate funds deposit
    initiateDeposit(depositData: {amount: number}): Observable<any> {
        return this.httpClient.post(this.initiateDepositUrl, depositData);
    }

    // Verify funds deposit
    verifyDeposit(reference: string): Observable<any> {
        return this.httpClient.post(this.verifyDepositUrl, { reference });
    }

    // Transfer funds
    transfer(walletData: any): Observable<any> {
        return this.httpClient.post(this.transferUrl, walletData);
    }
}