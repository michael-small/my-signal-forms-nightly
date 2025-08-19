import { JsonPipe } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map, startWith } from 'rxjs';
import { requiredIfValidator } from './form-helpers';

export class MealForm {
  readonly #fb = inject(NonNullableFormBuilder);

  mainMeal = this.#fb.control<string | null>(null, {
    validators: Validators.required,
  });
  wantSide = this.#fb.control<boolean>(false);
  side = this.#fb.control<'Fries' | 'Salad' | null>(null, {
    validators: requiredIfValidator(() => this.wantSide.value),
  });
  sideOptions = this.#fb.control<'S' | 'M' | 'L' | null | 'Ranch' | 'French'>(
    null,
    { validators: requiredIfValidator(() => this.wantSide.value) }
  );

  constructor() {
    this.wantSide.valueChanges.subscribe((value) => {
      this.side.reset();
      this.sideOptions.reset();
    });
    this.side.valueChanges.subscribe((value) => {
      this.sideOptions.reset();
    });
    this.wantSide.valueChanges
      .pipe(startWith(this.wantSide.value), takeUntilDestroyed())
      .subscribe((value) => {
        if (value) {
          this.side.enable();
        } else {
          this.side.disable();
        }
      });
    this.side.valueChanges
      .pipe(startWith(this.side.value), takeUntilDestroyed())
      .subscribe((value) => {
        console.log(value);
        if (value !== null) {
          this.sideOptions.enable();
        } else {
          this.sideOptions.disable();
        }
      });
  }
}

@Injectable()
export class ReactiveFormService {
  readonly #fb = inject(NonNullableFormBuilder);
  mealForm = this.#fb.group(new MealForm());

  mealFormValue = toSignal(
    this.mealForm.valueChanges.pipe(
      startWith(this.mealForm.getRawValue()),
      map(() => this.mealForm.getRawValue())
    ),
    { requireSync: true }
  );
}

@Component({
  selector: 'app-reactive-form',
  template: `
    <mat-form-field>
      <mat-label>Main Meal</mat-label>
      <input matInput [formControl]="form.controls.mainMeal" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Want Side?</mat-label>
      <mat-select [formControl]="form.controls.wantSide">
        <mat-option [value]="true">Yes</mat-option>
        <mat-option [value]="false">No</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Side</mat-label>
      <mat-select [formControl]="form.controls.side">
        <mat-option value="Fries">Fries</mat-option>
        <mat-option value="Salad">Salad</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Side Options</mat-label>
      <mat-select [formControl]="form.controls.sideOptions">
        @if (form.controls.side.value === 'Fries') {
        <mat-option value="S">Small</mat-option>
        <mat-option value="M">Medium</mat-option>
        <mat-option value="L">Large</mat-option>
        } @else {
        <mat-option value="Ranch">Ranch</mat-option>
        <mat-option value="French">French</mat-option>
        }
      </mat-select>
    </mat-form-field>

    <pre>value: {{ form.value | json }}</pre>
    <pre>valid: {{ form.valid }}</pre>
    <pre>side touched: {{ form.controls.side.touched }}</pre>
  `,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    JsonPipe,
  ],
  providers: [ReactiveFormService],
})
export class ReactiveFormComponent {
  formService = inject(ReactiveFormService);
  readonly form = this.formService.mealForm;
}
