import { Component } from "@angular/core";
import { AuthService } from "../../services/api.service";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { HlmButtonDirective } from "../../../../components/ui-button-helm/src/lib/hlm-button.directive";
import { HlmInputDirective } from "../../../../components/ui-input-helm/src/lib/hlm-input.directive";
import { HlmFormFieldModule } from "../../../../components/ui-formfield-helm/src/index";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, HlmButtonDirective, HlmInputDirective, HlmFormFieldModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe(
                response => console.log('Login successful', response),
                error => console.error('Login failed', error)
            );
        }
    }
}