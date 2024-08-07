import { Component } from "@angular/core";
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, HlmButtonDirective],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {}