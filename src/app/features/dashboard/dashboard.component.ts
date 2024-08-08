import { Component } from '@angular/core';
import { HlmButtonDirective } from '../../../../components/ui-button-helm/src/lib/hlm-button.directive';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, HlmButtonDirective],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}