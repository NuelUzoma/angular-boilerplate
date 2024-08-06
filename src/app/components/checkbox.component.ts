import { Component } from '@angular/core';
import { HlmCheckboxCheckIconComponent, HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
@Component({
	selector: 'spartan-checkbox',
	standalone: true,
	imports: [HlmLabelDirective, HlmCheckboxComponent ],
	template: `
		<label class="flex items-center" hlmLabel>
			<hlm-checkbox class="mr-2 test-md" />
			Click to accept all terms and conditions
		</label>
	`,
})
export class CheckboxComponent {}
