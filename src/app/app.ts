import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Control, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  template: `
    <h2>Cancel Service Form</h2>

    <form id="cancel-service-form">
      <mat-button-toggle-group
        name="cancelReason"
        aria-label="Reason to Cancel"
        [control]="cancelServiceForm.reason"
      >
        <mat-button-toggle value="user">Cost</mat-button-toggle>
        <mat-button-toggle value="spam">No longer use</mat-button-toggle>
        <mat-button-toggle value="other">Other</mat-button-toggle>
      </mat-button-toggle-group>

      @if(cancelServiceForm.reason().value() === 'other') {
      <mat-form-field>
        <mat-label>Other Explanation</mat-label>
        <textarea
          matInput
          [control]="cancelServiceForm.otherExplanation"
        ></textarea>
      </mat-form-field>
      }

      <button mat-raised-button [disabled]="!cancelServiceForm().valid()">
        Submit
      </button>
    </form>
  `,
  imports: [
    Control,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  styleUrls: [`./styles.scss`],
})
export class App {
  readonly cancelServiceForm = form(
    signal({ reason: '', otherExplanation: '' }),
    (path) => {
      required(path.reason);
      required(path.otherExplanation, {
        when({ valueOf }) {
          return valueOf(path.reason) === 'other';
        },
      });
    }
  );
}
