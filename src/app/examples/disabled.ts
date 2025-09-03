import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, disabled, Field, form } from '@angular/forms/signals';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormDebugData } from '../form-debug-data';

interface User {
  username: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-disabled',
  imports: [Control, MatFormField, MatInputModule, FormDebugData],
  template: `
    <h2>Disabled Field Example</h2>
    <a
      href="https://github.com/angular/angular/blob/prototype/signal-forms/packages/forms/signals/docs/signal-forms.md#binding-form-fields-to-ui-elements"
      target="_blank"
      >From this example</a
    >

    <form>
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput [control]="userForm.username" />
      </mat-form-field>
    </form>

    <app-form-debug-data [form]="userForm.username" />
  `,
})
export class Disabled {
  readonly userModel = signal({ username: '' });
  readonly userForm: Field<User> = form<User>(this.userModel, (userPath) => {
    disabled(userPath.username, () => 'Username is disabled');
  });
}
