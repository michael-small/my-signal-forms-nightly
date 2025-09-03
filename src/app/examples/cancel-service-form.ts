import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cancel-service-form',
  imports: [
    Control, // <--- for `[control]="myForm.someField"` directive
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  template: `
    <h2>Cancel Service Form</h2>

    <form id="cancel-service-form" (ngSubmit)="$event.preventDefault()">
      <mat-button-toggle-group
        aria-label="Reason to Cancel"
        name="cancelReason"
        [control]="cancelServiceForm.reason"
      >
        <mat-button-toggle value="user">Cost</mat-button-toggle>
        <mat-button-toggle value="spam">No longer use</mat-button-toggle>
        <mat-button-toggle value="other">Other</mat-button-toggle>
      </mat-button-toggle-group>

      @if (cancelServiceForm.reason().value() === 'other') {
        <mat-form-field>
          <mat-label>Other Explanation</mat-label>
          <textarea
            matInput
            [control]="cancelServiceForm.otherExplanation"
          ></textarea>
        </mat-form-field>
      }

      <button
        mat-raised-button
        type="submit"
        [disabled]="!cancelServiceForm().valid()"
      >
        Submit
      </button>
    </form>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;

      * {
        width: 50%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelServiceForm {
  readonly cancelServiceForm = form(
    signal({ reason: '', otherExplanation: '' }),
    (path) => {
      required(path.reason);
      required(path.otherExplanation, {
        when({ valueOf }) {
          return valueOf(path.reason) === 'other';
        },

        // Alternate syntax
        // when({ value }) {
        //   return value() === 'other';
        // },
      });
    },
  );
}
