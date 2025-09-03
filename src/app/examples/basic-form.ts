import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormData } from '../form-data';

@Component({
  selector: 'app-basic-form',
  imports: [Control, MatFormFieldModule, MatInputModule, FormData],
  template: `
    <h2>Basic Form</h2>
    <form>
      <mat-form-field>
        <mat-label>Input</mat-label>
        <input matInput [control]="myForm" />
      </mat-form-field>
    </form>

    <app-form-data [form]="myForm" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicForm {
  myForm = form(signal(''));
}
