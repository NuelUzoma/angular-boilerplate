import { Component } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

@Component({
	selector: 'spartan-form-field',
	standalone: true,
	imports: [HlmInputDirective, HlmFormFieldModule],
	template: `
		<hlm-form-field>
			<input class="w-80" hlmInput type="email" placeholder="Email" />
			<hlm-hint>This is your email address.</hlm-hint>
		</hlm-form-field>
	`,
})
export class FormFieldComponent {}
