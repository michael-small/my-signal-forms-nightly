import { Component, computed, effect, signal } from '@angular/core';
import {Control, form, required} from '../experimental'
import { JsonPipe } from '@angular/common';
import { ValidationError } from '../experimental/src/api/validation_errors';

@Component({
  selector: 'app-root',
  template: `
    <h1>My signal forms test</h1>

    <label>First Name</label>
    <input [control]="nameForm.firstName">

    <label>Last Name</label>
    <input [control]="nameForm.lastName">

    <pre>{{nameForm().value() | json}}</pre>
    <pre>{{allCapsNames() | json}}</pre>

    <pre>{{nameForm().errors() | json}}</pre>
    <pre>{{nameForm.firstName().errors()| json}}</pre>
  `,
  imports: [Control, JsonPipe]
})
export class App {
  formModel = signal({firstName: '', lastName: '', house: {
    number: 0,
    color: ''
  }});

  nameForm = form(this.formModel, (path) => {
    required(path.firstName, {when: ({valueOf}) => valueOf(path.lastName) !== ''})
  });

  allCapsNames = computed(() => {
    const val = this.nameForm().value();
    return {
      first: val.firstName.toUpperCase(),
      last: val.firstName.toUpperCase()
    }
  })

  constructor() {
    effect(() => {
      const form = this.nameForm()
      const formModel = this.formModel()

      const aCtrl = this.nameForm.firstName().errors();

      const keys = Object.keys(formModel)
      console.log(keys)

      const _form = this.nameForm as any

      const controlForFirstname = (this.nameForm as any)?.['firstName']()
      const controls = keys.map(key => {
        const ctrl = (this.nameForm as any)?.[key]()
        return ctrl.errors() as ValidationError[]
      })
      console.log(controls)
    })
  }
}
