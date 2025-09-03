import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-form-data',
  imports: [JsonPipe],
  template: `
    @let form = this.form()();

    <pre>value: {{ form.value() | json }}</pre>
    <p>valid: {{ form.valid() }}</p>
    <p>touched: {{ form.touched() }}</p>
    <p>dirty: {{ form.dirty() }}</p>
    <pre>errors: {{ form.errors() | json }}</pre>
    <pre>errorSummary: {{ form.errorSummary() | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormData {
  readonly form = input.required<() => FieldState<unknown, string | number>>();
}
