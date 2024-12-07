import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
        
@Component({
    selector: 'transfer-card-template',
    template: `
        <div class="card flex justify-content-center">
            <p-card header="Transfer" subheader="Make your express transfers!" [style]="{ width: '360px' , height: '450px'}">
                <ng-template pTemplate="header">
                    <img alt="Card" src="assets/transfer.jpeg" />
                </ng-template>
                <p>
                    Make your transfers with one tap!
                </p>
                <ng-template pTemplate="footer">
                    <div class="flex gap-1 mt-1">
                        <p-button routerLink="/transfer" label="Transfer" class="w-full transfer" styleClass="w-full"/>
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
    .transfer {
        background-color: blue;
        color: whitesmoke;
        border: round;
        margin-left: 20px;
        margin-right: 20px;
    }
    `
})
export class TransferCardTemplate {}