import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-form-debug-data',
  imports: [JsonPipe],
  template: `
    @let form = this.form()();

    <!-- There is other form state but I find this most relevant/interesting -->
    <pre>value: {{ form.value() | json }}</pre>
    <p>valid: {{ form.valid() }}</p>
    <p>touched: {{ form.touched() }}</p>
    <p>dirty: {{ form.dirty() }}</p>
    <p>disabled: {{ form.disabled() }}</p>
    <p>disabledReasons: {{ form.disabledReasons() | json }}</p>
    <!-- Form errors only -->
    <pre>errors: {{ form.errors() | json }}</pre>
    <!-- Form + descendents -->
    <pre>errorSummary: {{ form.errorSummary() | json }}</pre>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      padding: 8px;
      background: #f3f3f3;
      border: 1px solid orange;
      max-width: 50%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDebugData {
  readonly form = input.required<() => FieldState<unknown, string | number>>();
}
