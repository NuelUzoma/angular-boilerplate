import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { HlmInputDirective } from "../../../../components/ui-input-helm/src/lib/hlm-input.directive";
import { HlmFormFieldModule } from "../../../../components/ui-formfield-helm/src/index";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        HlmButtonDirective,
        HlmInputDirective,
        HlmFormFieldModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        ButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (response) => {
                    // Store the JWT Token in localStorage
                    localStorage.setItem('token', response.token);

                    // Redirect user to the dashboard
                    this.router.navigate(['/dashboard']);

                    console.log('Login successful');
                },
                error: (error) => {
                    // Handle any error that occur
                    console.error('Login error:', error);
                }
            }
            );
        }
    }
}