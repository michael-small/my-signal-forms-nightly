import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form, readonly, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormDebugData } from '../form-debug-data';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-readonly',
  imports: [
    Control,
    MatFormFieldModule,
    MatInputModule,
    FormDebugData,
    MatButton,
  ],
  template: `
    <h2>Readonly</h2>
    <p>
      NOTE: 21.0.0-next.2 - Material forms do not inherantly respect the
      readonly behavior of signal forms at the moment. Use native inputs for the
      moment.
    </p>

    <button mat-raised-button type="button" (click)="readonly.set(!readonly())">
      Toggle Readonly
    </button>

    <!-- <form>
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input matInput [control]="myForm" />
      </mat-form-field>
    </form> -->

    <input [control]="myForm" />

    <pre>readonly: {{ myForm().readonly() }}</pre>

    <app-form-debug-data [form]="myForm" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Readonly {
  // my linter thought it was real funny endorsing this one
  readonly readonly = signal(true);

  myForm = form(signal(''), (p) => {
    // Can react to other signals, even outside of form,
    // or statically just be defined like: `readonly(p);`
    readonly(p, () => this.readonly());
  });
}
