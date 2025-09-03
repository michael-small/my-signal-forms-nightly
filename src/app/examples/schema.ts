import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  Control,
  customError,
  email,
  form,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormData } from '../form-data';

// https://github.com/angular/angular/blob/prototype/signal-forms/packages/forms/signals/docs/signal-forms.md#creating-and-applying-a-schema
// Define the data type for the form.
type ConfirmedPassword = {
  password: string;
  confirm: string;
};

// Define a schema for this data type.
const passwordSchema = schema<ConfirmedPassword>((path) => {
  // Logic rules (like validators) will be defined inside this function.
  // Adds validation logic to require a value for `password`.
  required(path.password);
  // Adds validation logic to require a value for `confirm`.
  required(path.confirm);

  // Requires both fields to match
  validate(path, ({ value }) =>
    value().password !== value().confirm
      ? [customError({ kind: 'mismatch', message: 'Passwords do not match' })]
      : [],
  );

  // Alternates: valueOf and fieldOf
  // validate(path, ({ valueOf, fieldOf }) => {
  //   const password = valueOf(path.password);
  //   const confirm = fieldOf(path.confirm);
  //   return password !== confirm().value()
  //     ? [customError({ kind: 'mismatch', message: 'Passwords do not match' })]
  //     : [];
  // });
});

@Component({
  selector: 'app-schema',
  imports: [Control, MatFormFieldModule, MatInputModule, FormData],
  template: `
    <h2>
      Form with Schema: Using a schema, and cross-field validation with custom
      validator
    </h2>
    <a
      href="https://github.com/angular/angular/blob/prototype/signal-forms/packages/forms/signals/docs/signal-forms.md#creating-and-applying-a-schema"
      target="_blank"
      >Example lifted verbatim from the experimental branch's docs. But with
      overall matching validator added myself.
    </a>
    <p>
      I went a bit off-script with the cross field validation, but it is the
      same concept/end goal of the "Password and confirmation password" section.
    </p>
    <form>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput [control]="passwordForm.password" />
        @if (passwordForm.password().errors()[0]?.kind === 'required') {
          <mat-error>Password required</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Confirm Password</mat-label>
        <input matInput [control]="passwordForm.confirm" />
        @if (passwordForm.confirm().errors()[0]?.kind === 'required') {
          <mat-error>Confirm Password required</mat-error>
        }
      </mat-form-field>
    </form>

    @if (passwordForm().errors()[0]?.kind === 'mismatch') {
      <mat-error>{{ passwordForm().errors()[0]?.message }}</mat-error>
    }

    <app-form-data [form]="passwordForm" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Schema {
  // Create the data model.
  readonly passwordModel = signal<ConfirmedPassword>({
    password: '',
    confirm: '',
  });

  // Create the field structure, adding the logic from the schema.
  passwordForm = form(this.passwordModel, passwordSchema);

  // Now, passwordForm's state (e.g. this.passwordForm().errors)
  // will be determined by the rules defined in passwordSchema.
}
