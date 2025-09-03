import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicForm } from './examples/basic-form';
import { BasicFormValidators } from './examples/basic-form-validators';
import { CancelServiceForm } from './examples/cancel-service-form';
import { Schema } from './examples/schema';
import { ResetsField } from './resets-field';

@Component({
  selector: 'app-root',
  template: `
    <app-basic-form />
    <app-basic-form-validators />
    <app-cancel-service-form />
    <app-schema />
  `,
  imports: [
    BasicForm,
    BasicFormValidators,
    CancelServiceForm,
    Schema,
    ResetsField,
  ],
  styleUrls: [`./styles.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
