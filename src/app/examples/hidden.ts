import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form, hidden } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormDebugData } from '../form-debug-data';

/**
 * @deprecated WIP - I must be doing something wrorg or there is some gap. Not seeing the logic work as stated.
 */
@Component({
  selector: 'app-hidden',
  imports: [Control, MatFormFieldModule, MatInputModule, FormDebugData],
  template: `
    <h2>Hidden</h2>

    <p>As per the current definition of hidden:</p>
    <div id="quote">
      <blockquote>
        <p>
          When a field is hidden it is ignored when determining the valid,
          touched, and dirty states.
        </p>
        <p>
          Note: This doesn't hide the field in the template, that must be done
          manually.
        </p>
      </blockquote>
      <p><cite>—21.0.0-next.2 docs</cite></p>
    </div>

    <form>
      <!-- <mat-form-field>
        <mat-label>Not Hidden</mat-label>
        <input matInput [control]="myForm.notHidden" />
      </mat-form-field> -->

      <label>Not Hidden</label>
      <input [control]="myForm.notHidden" />

      <!-- <mat-form-field>
        <mat-label>Hidden</mat-label>
        <input matInput [control]="myForm.hiddenStuff" />
      </mat-form-field> -->

      <label>Hidden</label>
      <input [control]="myForm.hiddenStuff" />
    </form>

    <pre>hiddenStuff hidden: {{ myForm.hiddenStuff().hidden() }}</pre>
    <pre>form touched: {{ myForm().touched() }}</pre>

    <app-form-debug-data [form]="myForm" />
  `,
  styles: `
    #quote {
      border-left: 3px solid gray;
      padding-left: 4px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hidden {
  readonly hidden = signal(true);
  myForm = form(signal({ notHidden: '', hiddenStuff: '' }), (p) => {
    hidden(p.hiddenStuff, ({ value }) => {
      return value() === '';
    });
  });
}
