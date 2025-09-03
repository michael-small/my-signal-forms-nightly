import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicForm } from './examples/basic-form';
import { BasicFormValidators } from './examples/basic-form-validators';
import { CancelServiceForm } from './examples/cancel-service-form';

@Component({
  selector: 'app-root',
  template: `
    <app-basic-form />
    <app-basic-form-validators />
    <app-cancel-service-form />
  `,
  imports: [BasicForm, BasicFormValidators, CancelServiceForm],
  styleUrls: [`./styles.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
