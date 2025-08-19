import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import {
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Control, disabled, form, required } from './experimental';

@Injectable()
export class SignalFormService {
  mealModel = signal<{
    mainMeal: string | null;
    wantSide: boolean;
    side: 'Fries' | 'Salad' | null;
    sideOptions: 'S' | 'M' | 'L' | null | 'Ranch' | 'French';
  }>({
    mainMeal: null,
    wantSide: false,
    side: null,
    sideOptions: null,
  });

  mealForm = form(this.mealModel, (path) => {
    required(path.mainMeal);
    required(path.side, { when: ({ valueOf }) => valueOf(path.wantSide) });
    required(path.sideOptions, {
      when: ({ valueOf }) => valueOf(path.wantSide),
    });
    disabled(path.side, ({ valueOf }) => !valueOf(path.wantSide));
    disabled(
      path.sideOptions,
      ({ valueOf }) => !valueOf(path.wantSide && path.side)
    );
  });

  wantSideChanged() {
    this.mealForm.side().value.set(null)
    this.mealForm.side().reset()

    this.mealForm.sideOptions().value.set(null)
    this.mealForm.sideOptions().reset()
  }
  sideChanged() {
    this.mealForm.sideOptions().value.set(null)
    this.mealForm.sideOptions().reset()
  }

  mealFormValue = computed(() => this.mealForm().value());
}

@Component({
  selector: 'app-signal-form',
  template: `
    <mat-form-field>
      <mat-label>Main Meal</mat-label>
      <input matInput [control]="form.mainMeal" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Want Side?</mat-label>
      <mat-select
        [control]="form.wantSide"
        (selectionChange)="wantSideChanged()"
      >
        <mat-option [value]="true">Yes</mat-option>
        <mat-option [value]="false">No</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Side</mat-label>
      <mat-select
        [control]="form.side"
        [disabled]="form.side().disabled()"
        (selectionChange)="sideChanged()"
      >
        <mat-option value="Fries">Fries</mat-option>
        <mat-option value="Salad">Salad</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Side Options</mat-label>
      <mat-select
        [control]="form.sideOptions"
        [disabled]="form.sideOptions().disabled()"
      >
        @if (form.side().value() === 'Fries') {
        <mat-option value="S">Small</mat-option>
        <mat-option value="M">Medium</mat-option>
        <mat-option value="L">Large</mat-option>
        } @else {
        <mat-option value="Ranch">Ranch</mat-option>
        <mat-option value="French">French</mat-option>
        }
      </mat-select>
    </mat-form-field>

    <pre>value: {{ form().value() | json }}</pre>
    <pre>valid: {{ form().valid() }}</pre>
    <pre>side touched: {{ form.side().touched() }}</pre>
  `,
  imports: [
    Control,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    JsonPipe,
  ],
  providers: [SignalFormService],
})
export class SignalFormComponent {
  formService = inject(SignalFormService);
  readonly form = this.formService.mealForm;

  wantSideChanged() {
    this.formService.wantSideChanged();
  }

  sideChanged() {
    this.formService.sideChanged();
  }
}
