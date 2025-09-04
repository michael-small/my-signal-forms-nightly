import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form, pattern, required } from '@angular/forms/signals';

@Component({
  selector: 'app-jean-meche-example',
  imports: [Control, JsonPipe],
  template: `
    <h2>JeanMeche Example</h2>
    <a
      href="https://www.reddit.com/r/angular/comments/1n7pcn6/signal_forms_for_you_to_experiment_with/"
      target="_blank"
      >Code from Matthieu Riegler (/u/JeanMeche)</a
    >

    <input [control]="nameForm.first" />
    <input [control]="nameForm.last" />

    <!-- Form validity -->
    valid: {{ nameForm().valid() }}
    <!-- Form value -->
    value: {{ nameForm().value() | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JeanMecheExample {
  nameForm = form(signal({ first: '', last: '' }), (name) => {
    required(name.first);
    pattern(name.last, /^[a-z]+$/i, { message: 'Alphabet characters only' });
  });
}
