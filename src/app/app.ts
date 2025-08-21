import { Component, linkedSignal, Signal, signal } from '@angular/core';
import { LinkedSignal } from './examples/linked-signal';
import { Resource } from './examples/resource';
import { ReactiveFormComponent } from '../reactive-form.service';
import { SignalFormComponent } from '../signal-form.service';
import { Parent } from './child-form-example/parent';

@Component({
  selector: 'app-root',
  template: ` <app-parent /> `,
  imports: [Parent],
})
export class App {}
