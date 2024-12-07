import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
        
@Component({
    selector: 'deposit-card-template',
    template: `
        <div class="card flex justify-content-center">
            <p-card header="Deposit" subheader="Fund your wallet" [style]="{ width: '360px' , height: '450px'}">
                <ng-template pTemplate="header">
                    <img alt="Card" src="assets/deposit.jpg" />
                </ng-template>
                <p>
                    Top up your wallet today!
                </p>
                <ng-template pTemplate="footer">
                    <div class="flex gap-1 mt-1">
                        <p-button routerLink="/deposit" label="Deposit" class="w-full deposit" styleClass="w-full"/>
                    </div>
                </ng-template>
            </p-card>
        </div>
    `,
    standalone: true,
    imports: [
        CardModule,
        ButtonModule,
        RouterLink,
        RouterOutlet,
        RouterLinkActive
    ],
    styles: `
    .deposit {
        background-color: blue;
        color: whitesmoke;
        border: round;
        margin-left: 20px;
        margin-right: 20px;
    }
    `
})
export class DepositCardTemplate {}