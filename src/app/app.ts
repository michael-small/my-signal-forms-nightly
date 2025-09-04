import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicForm } from './examples/basic-form';
import { BasicFormValidators } from './examples/basic-form-validators';
import { CancelServiceForm } from './examples/cancel-service-form';
import { Schema } from './examples/schema';
import { ResetsField } from './resets-field';
import { Disabled } from './examples/disabled';
import { JeanMecheExample } from './examples/jean-meche-example';
import { Readonly } from './examples/readonly';
import { Hidden } from './examples/hidden';

@Component({
  selector: 'app-root',
  template: `
    <h1>Signal Forms Examples</h1>

    <section id="about">
      <p>
        NOTE: due to a weird Stackblitz/Material/Firefox
        <a
          href="https://github.com/angular/components/issues/31823"
          target="_blank"
          >bug</a
        >, I am commenting out the Material theme before pushing to main.
      </p>
      <p>
        Work in progress. A small subset of what is possible already. The
        Angular team put a ton of work into this new API and is continuing to
        improve it, but they wanted to get this into our hands to experiment.
      </p>
      <p>
        This is based on a mix of the "/docs" on the pre-merge-to-main prototype
        branch, unit tests, and my intuition. There is no formal public
        documentation at the moment to my knowledge, so apart from those WIP
        context clues, I am winging it with this showcase's code.
      </p>

      <p>
        Some of the debug data is for a whole form, some for a single field.
      </p>

      <a
        href="https://github.com/michael-small/my-signal-forms-nightly"
        target="_blank"
        >Repo. Feel free to make issue/PR.</a
      >
    </section>

    <!-- <app-hidden /> -->

    <app-jean-meche-example />
    <app-basic-form />
    <app-basic-form-validators />
    <app-cancel-service-form />
    <app-schema />
    <app-disabled />
    <app-readonly />
  `,
  imports: [
    BasicForm,
    BasicFormValidators,
    CancelServiceForm,
    Schema,
    ResetsField,
    Disabled,
    JeanMecheExample,
    Readonly,
    Hidden,
  ],
  styleUrls: [`./styles.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
