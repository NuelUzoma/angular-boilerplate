import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { routes } from "../../app.routes";
import { AuthService } from "../../services/auth.service";
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { HlmInputDirective } from "../../../../components/ui-input-helm/src/lib/hlm-input.directive";
import { HlmFormFieldModule } from "../../../../components/ui-formfield-helm/src/index";
import { CheckboxComponent } from "../../components/checkbox.component";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        HlmButtonDirective,
        HlmInputDirective,
        HlmFormFieldModule,
        CheckboxComponent,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        ButtonModule
    ],
    templateUrl: './signup.component.html', // Link to html form template
    styleUrls: ['./signup.component.scss'] // Link to scss styling
})
export class SignupComponent {
    signupForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.signupForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit() {
        if (this.signupForm.valid) {
            this.authService.signup(this.signupForm.value).subscribe({
                next: (response) => {
                    console.log(`Signup successful: ${response}`);

                    // The login route
                    const loginRoute = routes.find(route => route.path === 'login');

                    // Redirect to login route after successful signup
                    if (loginRoute) {
                        this.router.navigate([`/${loginRoute.path}`]);
                    } else {
                        console.error('Login route not found');
                    }
                },
                error: (error) => {
                    console.error(`Signup failed: ${error}`);
                }
            });
        }
    }
}