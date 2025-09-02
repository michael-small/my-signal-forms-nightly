import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicForm } from './basic-form';
import { BasicFormValidators } from './basic-form-validators';
import { CancelServiceForm } from './cancel-service-form';

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
