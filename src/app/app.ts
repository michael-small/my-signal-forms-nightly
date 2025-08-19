import { Component, computed, effect, signal } from '@angular/core';
import { Control, form, required } from '../experimental';
import { JsonPipe } from '@angular/common';
import { ValidationError } from '../experimental/src/api/validation_errors';
import { ValidateAsyncIssue } from './validateAsyncIssue';
import { ReactiveFormComponent } from '../reactive-form.service';
import { SignalFormComponent } from '../signal-form.service';

@Component({
  selector: 'app-root',
  template: `
    <app-reactive-form />
    <hr />
    <app-signal-form />
  `,
  imports: [ReactiveFormComponent, SignalFormComponent],
})
export class App {}
