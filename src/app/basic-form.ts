import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basic-form',
  imports: [],
  template: `
    <p>
      basic-form works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicForm {

}
